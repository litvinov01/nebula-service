import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'hellow.world@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: {
      payment: 'stripe',
      age: 52,
    },
  })
  @IsObject()
  marketingData: Record<string, any>;
}
