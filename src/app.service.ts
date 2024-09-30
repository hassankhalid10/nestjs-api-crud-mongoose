import { Injectable } from '@nestjs/common';

// The '@Injectable()' decorator marks the class as a service that can be 
// injected into other classes or components. This is a fundamental part 
// of NestJS's Dependency Injection system, allowing the 'AppService' class
// to be used anywhere in the application.
@Injectable()  
export class AppService {

  // This method 'getHello()' returns a simple string message 'Hello World!'.
  // It could be used in a controller to send a response to a user.
  getHello(): string {  
    return 'Hello World!';
  }
}
