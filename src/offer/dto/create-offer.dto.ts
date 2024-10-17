import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ example: 'Mega astrology' })
  @IsString()
  name: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsPositive()
  price: number;
}
