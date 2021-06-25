import { ApiProperty } from '@nestjs/swagger';

export class ProductsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class CardsDto {
  constructor() {}

  @ApiProperty()
  userId: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  totalQuantity: number;

  @ApiProperty()
  products: ProductsDto[];
}

export class UpdateCartDto {
  @ApiProperty()
  cartId: string;

  @ApiProperty()
  productId: string;
}

export class CreateCartDto {
  @ApiProperty()
  productId: string;
}
