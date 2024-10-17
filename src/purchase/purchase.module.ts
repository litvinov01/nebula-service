import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Offer } from 'src/offer/entities/offer.entity';
import { BullModule } from '@nestjs/bull';
import { PurchaseProcessor } from './purchase.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, User, Offer]),
    HttpModule.register({
      timeout: 1000,
    }),
    BullModule.registerQueue({
      name: 'predict-queue',
    }),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, ConfigService, PurchaseProcessor],
})
export class PurchaseModule {}
