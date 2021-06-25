import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { CardsDto } from './carts.dto';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CARTS_SERVICE') private cartsClient: ClientProxy,
    private productsService: ProductsService,
  ) {}

  async updateCart(data: {
    cartId: string;
    productId: string;
    userId?: string;
  }): Promise<any> {
    const pattern = { cmd: 'updateCart' };

    const cart = await this.findCart(data.cartId);

    if (!cart) throw new NotFoundException('Cart not found!');

    const product = await this.productsService.findOne(data.productId);

    if (!product) throw new NotFoundException('Product not found!');

    const productAlreadyExists = cart.products.find((prod) => {
      if (product.name === prod.name) {
        prod.quantity += 1;
        return prod;
      }

    });

    const quantity = productAlreadyExists
      ? productAlreadyExists.quantity + 1
      : 1;

    let addProduct
    if(!productAlreadyExists){
      addProduct = { name: product.name, price: product.price, quantity }
      cart.products.push(addProduct);
    }

    let totalPrice = 0;

    for await (const product of cart.products) {
      const totalProduct = product.price * product.quantity;
      totalPrice += totalProduct;
    }

    const res = {
      _id: cart.id,
      userId: data.userId,
      totalPrice,
      totalQuantity: cart.products.length,
      products: cart.products,
    };

    return this.cartsClient.send<number>(pattern, res);
  }

  async createCart(data: { productId: string; userId?: string }): Promise<any> {
    const pattern = { cmd: 'createCart' };

    const product = await this.productsService.findOne(data.productId);

    if (!product) throw new NotFoundException('Product not found!');

    const addProduct = {
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    const res = {
      userId: data.userId,
      totalPrice: product.price,
      totalQuantity: 1,
      products: [addProduct],
    };

    return this.cartsClient.send<number>(pattern, res);
  }

  findOne(userId: string): Observable<CardsDto> {
    const pattern = { cmd: 'listCarts' };
    return this.cartsClient.send<CardsDto>(pattern, userId);
  }

  async findCart(cartId: string) {
    const pattern = { cmd: 'findCart' };
    const res = this.cartsClient.send<any>(pattern, { cartId });
    return res.toPromise();
  }
}
