import { ApiProperty } from '@nestjs/swagger';

export class ProductsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}
