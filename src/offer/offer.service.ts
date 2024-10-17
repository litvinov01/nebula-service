import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { FactoryService } from '../common';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService extends FactoryService<Offer, CreateOfferDto> {
  constructor(@InjectRepository(Offer) offerRepository: Repository<Offer>) {
    super(offerRepository, 'Offer');
  }
}
