import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated - USERS', data);
    this.users.push({
      name: data.name,
      timestamp: new Date(),
    });
  }

  getUsers() {
    return this.users;
  }
}
