import {
  Controller,
  Post,
  Body,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ERROR_MESSAGE } from '../common';
import { CreatePurchaseDocs } from './docs';
import { CREATE_PURCHASE_DECORATORS } from './docs/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @CreatePurchaseDocs(CREATE_PURCHASE_DECORATORS)
  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    try {
      return await this.purchaseService.create(createPurchaseDto);
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new BadRequestException(ERROR_MESSAGE.badRequest);
    }
  }
}
