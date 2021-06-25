import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/rexpo'),
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
