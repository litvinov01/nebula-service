import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Purchase])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
