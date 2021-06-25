import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartsDocument = Carts & Document;

@Schema()
export class Carts {
  @Prop()
  userId: string;

  @Prop()
  totalPrice: number;

  @Prop()
  totalQuantity: number;

  @Prop()
  products: [{ name: string; price: number; quantity: number }];
}

export const CartsSchema = SchemaFactory.createForClass(Carts);
