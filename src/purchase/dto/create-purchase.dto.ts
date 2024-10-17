import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({ example: 253 })
  @IsNumber()
  offerId: number;

  @ApiProperty({ example: 400 })
  @IsNumber()
  userId: number;
}
