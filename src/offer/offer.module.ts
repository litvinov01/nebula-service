import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Purchase])],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
