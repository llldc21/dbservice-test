import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductsDto } from './products/dto/create-products.dto';
import { ProductsService } from './products/products.service';

@Controller()
export class AppController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern({ cmd: 'addProducts' })
  addProducts(data: CreateProductsDto[]): any {
    return this.productsService.create(data);
  }

  @MessagePattern({ cmd: 'listProducts' })
  listProducts(): any {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'listProduct' })
  listProduct(data: { id: string }): any {
    return this.productsService.findOne(data.id);
  }
}
