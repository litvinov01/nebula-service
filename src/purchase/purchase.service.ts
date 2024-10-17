import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '../common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Purchase } from './entities/purchase.entity';
import { Offer } from '../offer/entities/offer.entity';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MS_DAY } from '../common/constants/time';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectQueue('predict-queue') private readonly predictQueue: Queue,
  ) {}

  public async create(createPurchaseDto: CreatePurchaseDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: createPurchaseDto.userId,
      },
    });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.notFound('User'));
    }

    const offer = await this.offerRepository.findOne({
      where: { id: createPurchaseDto.offerId },
    });

    if (!offer) {
      throw new BadRequestException(ERROR_MESSAGE.notFound('Offer'));
    }

    const purchase = this.purchaseRepository.create({
      user,
      offer,
    });

    const created = await this.purchaseRepository.save(purchase);
    await this.handleCreatedPurchase(created);
    await this.sendPostponedPrediction();
    return SUCCESS_MESSAGES.instanceChanged('Purchase', 'created');
  }

  private async handleCreatedPurchase(created: Purchase) {
    try {
      const fetchURL = this.configService.get('FETCH_URL');

      const result = await firstValueFrom(
        this.httpService.put(`${fetchURL}/some-fake-path`, created),
      );
      if (result.status >= 400) {
        await this.purchaseRepository.delete({ id: created.id });
        throw new BadRequestException(ERROR_MESSAGE.badRequest);
      }
    } catch (error) {
      await this.purchaseRepository.delete({ id: created.id });
      throw error;
    }
  }

  private async sendPostponedPrediction() {
    await this.predictQueue.add(
      'send.prediction',
      { prediction: 'Some fake prediction' },
      {
        delay: MS_DAY,
      },
    );
  }
}
