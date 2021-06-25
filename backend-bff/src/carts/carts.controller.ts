import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardsDto, UpdateCartDto, CreateCartDto } from './carts.dto';
import { CartsService } from './carts.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({
    summary: 'Update cart',
    description: 'Add product to cart',
    tags: ['Cart'],
  })
  @ApiBearerAuth('Authorization')
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 201, type: CardsDto })
  async addProducts(
    @Body()
    updateCartsDto: { cartId: string; productId: string; userId?: string },
    @Request() req,
  ) {
    updateCartsDto.userId = req.user.userId;
    return this.cartService.updateCart(updateCartsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @ApiOperation({
    summary: 'Create cart',
    description: 'Create cart ',
    tags: ['Cart'],
  })
  @ApiBearerAuth('Authorization')
  @ApiBody({ type: CreateCartDto })
  @ApiResponse({ status: 201, type: CardsDto })
  async updateCart(
    @Body() addCartsDto: { productId: string; userId?: string },
    @Request() req,
  ) {
    addCartsDto.userId = req.user.userId;
    return this.cartService.createCart(addCartsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:userId')
  @ApiOperation({
    summary: 'List carts',
    description: 'List carts based in userId',
    tags: ['Cart'],
  })
  @ApiBearerAuth('Authorization')
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({ status: 201, type: CardsDto })
  async listProduct(@Param() userId: string) {
    return this.cartService.findOne(userId);
  }
}
