import { DeepPartial, Repository } from 'typeorm';
import { TMessage } from '../types';
import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGE, SUCCESS_MESSAGES } from '../constants/messages';
import { IIdAbleModel } from '../interfaces';

export class FactoryService<
  T extends IIdAbleModel,
  DTO extends DeepPartial<T>,
> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly instanceName: string,
  ) {}

  async create(createUserDto: DTO): Promise<TMessage & IIdAbleModel> {
    const created = await this.repository.save(createUserDto);
    if (!created) throw new BadRequestException(ERROR_MESSAGE.badRequest);

    return {
      message: SUCCESS_MESSAGES.instanceChanged(this.instanceName, 'created'),
      id: created.id,
    };
  }
}
