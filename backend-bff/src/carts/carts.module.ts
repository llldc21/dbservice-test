import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { CartController } from './carts.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CARTS_SERVICE',
        transport: Transport.TCP,
        options: { port: 9091 },
      },
    ]),
    ProductsModule,
  ],
  providers: [CartsService],
  controllers: [CartController],
})
export class CartsModule {}
