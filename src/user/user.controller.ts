import {
  Controller,
  Post,
  Body,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDocs } from './docs';
import { CREATE_USER_DECORATORS } from './docs/swagger.decorators';
import { ERROR_MESSAGE } from '../common';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CreateUserDocs(CREATE_USER_DECORATORS)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new BadRequestException(ERROR_MESSAGE.badRequest);
    }
  }
}
