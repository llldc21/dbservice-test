import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProductsDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCTS_SERVICE') private client: ClientProxy) {}

  addProducts(): Observable<number> {
    const pattern = { cmd: 'addProducts' };
    const payload = [
      { name: 'Refigerante', price: 5 },
      { name: 'Salgado', price: 3 },
      { name: 'Laranja', price: 3.8 },
      { name: 'Suco', price: 2 },
      { name: 'Carne', price: 25 },
    ];
    return this.client.send<number>(pattern, payload);
  }

  listProducts(): Observable<number> {
    const pattern = { cmd: 'listProducts' };
    const payload = {};
    return this.client.send<number>(pattern, payload);
  }

  findOne(id: string): Promise<ProductsDto> {
    const pattern = { cmd: 'listProduct' };
    const res = this.client.send<ProductsDto>(pattern, {id});
    return res.toPromise();
  }
}
