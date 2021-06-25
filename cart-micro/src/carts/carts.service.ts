import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Carts, CartsDocument } from './schemas/carts.schema';
import { CreateCartsDto } from './dto/create-carts.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Carts.name) private cartsModel: Model<CartsDocument>,
  ) {}

  async create(createProductsDto: any): Promise<any> {
    const cartCreated = new this.cartsModel(createProductsDto);
    let savedCart = await cartCreated.save();

    return {
      id: savedCart._id,
      userId: savedCart.userId,
      totalPrice: savedCart.totalPrice,
      totalQuantity: savedCart.totalQuantity,
      products: savedCart.products,
    };
  }

  async update(createProductsDto: any): Promise<any> {
    const cartExists = await this.findCart(createProductsDto._id);
    let savedCart;

    console.log(cartExists);

    const id = createProductsDto._id;
    if (cartExists) {
      delete createProductsDto._id;
      savedCart = await this.cartsModel.updateOne(
        { _id: id },
        { ...createProductsDto },
      );
    } else {
      return null;
    }

    return this.findCart(id);
  }

  async findOne(userId: string): Promise<any> {
    const cart = await this.cartsModel.findOne({ userId }).exec();

    if (cart) {
      return {
        id: cart._id,
        userId: cart.userId,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
        products: cart.products,
      };
    } else {
      return null;
    }
  }

  async findCart(cartId: string): Promise<any> {
    const cart = await this.cartsModel.findById({ _id: cartId }).exec();

    if (cart) {
      return {
        id: cart._id,
        userId: cart.userId,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
        products: cart.products,
      };
    } else {
      return null;
    }
  }
}
