import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCartsDto } from './carts/dto/create-carts.dto';
import { ProductsService } from './carts/carts.service';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern({ cmd: 'updateCart' })
  updateCart(data: CreateCartsDto): any {
    return this.productsService.update(data);
  }

  @MessagePattern({ cmd: 'createCart' })
  addCart(data: CreateCartsDto): any {
    return this.productsService.create(data);
  }

  @MessagePattern({ cmd: 'listCarts' })
  listCarts(data: { userId: string }): any {
    return this.productsService.findOne(data.userId);
  }

  @MessagePattern({ cmd: 'findCart' })
  findCart(data: { cartId: string }): any {
    console.log(data);
    return this.productsService.findCart(data.cartId);
  }
}
