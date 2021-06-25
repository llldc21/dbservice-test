import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductsDto } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('add')
  @ApiOperation({
    summary: 'Add products',
    description: 'Add products in db ',
    tags: ['Products'],
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 201, type: ProductsDto })
  async addProducts() {
    return this.productsService.addProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({
    summary: 'List products',
    description: 'List all products',
    tags: ['Products'],
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 201, type: [ProductsDto] })
  async listProducts() {
    return this.productsService.listProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:id')
  @ApiOperation({
    summary: 'List product',
    description: 'List one product',
    tags: ['Products'],
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 201, type: ProductsDto })
  async listProduct(@Param() id: string) {
    return this.productsService.findOne(id);
  }
}
