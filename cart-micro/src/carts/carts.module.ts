import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './carts.service';
import { Carts, CartsSchema } from './schemas/carts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carts.name, schema: CartsSchema },
    ]),
  ],
  controllers: [],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class CartsModule {}
