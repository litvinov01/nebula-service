import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { OfferModule } from './offer/offer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { Offer } from './offer/entities/offer.entity';
import { Purchase } from './purchase/entities/purchase.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Offer, Purchase],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Purchase, Offer]),
    OfferModule,
    PurchaseModule,
  ],
})
export class AppModule {}
