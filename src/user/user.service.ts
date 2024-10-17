import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FactoryService } from '../common';

@Injectable()
export class UserService extends FactoryService<User, CreateUserDto> {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository, 'User');
  }
}
