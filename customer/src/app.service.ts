import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly customer: any[] = [];
 
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated - CUSTOMER', data);
    // TODO: Email the user...
    this.customer.push({
      name: data.name,
      timestamp: new Date(),
    });
  }
  getCustomer() {
    return this.customer;
  }
}
