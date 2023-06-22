import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
 
  private readonly users: any[] = [];

  constructor(
    @Inject('CUSTOMER') private readonly customerClient: ClientProxy,
    @Inject('USERS') private readonly usersClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.customerClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.name),
    );
    this.usersClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.name),
    );
  }

  getUsers() {
    return this.usersClient.send({ cmd: 'get_users' }, {});
  }

  getCustomer() {
    return this.customerClient.send({ cmd: 'get_customer' }, {});
  }
}
