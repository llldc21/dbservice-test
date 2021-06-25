import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';
import { CreateProductsDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
  ) {}

  async create(createProductsDto: CreateProductsDto[]): Promise<any> {
    let response = [];
    for await (const product of createProductsDto) {
      const createdProduct = new this.productsModel(product);
      const savedProduct = await createdProduct.save();
      response.push({
        id: savedProduct._id,
        name: savedProduct.name,
        price: savedProduct.price,
      });
    }

    return response;
  }

  async findAll(): Promise<Products[]> {
    let response = [];
    const products = await this.productsModel.find().exec();
    for await (const product of products) {
      response.push({
        id: product._id,
        name: product.name,
        price: product.price,
      });
    }
    return response;
  }

  async findOne(id: string): Promise<Products> {
    console.log(id);
    const product = await this.productsModel.findById({ _id: id }).exec();
    return {
      id: product._id,
      name: product.name,
      price: product.price,
    } as Products;
  }
}
