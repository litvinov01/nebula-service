import {
  Controller,
  Post,
  Body,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { CreateOfferDocs } from './docs';
import { CREATE_OFFER_DECORATORS } from './docs/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';
import { ERROR_MESSAGE } from '../common';

@ApiTags('Offers')
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @CreateOfferDocs(CREATE_OFFER_DECORATORS)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto) {
    try {
      return await this.offerService.create(createOfferDto);
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new BadRequestException(ERROR_MESSAGE.badRequest);
    }
  }
}
