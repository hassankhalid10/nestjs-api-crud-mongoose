// Import necessary modules from NestJS.
import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

// Define the controller class. A controller handles incoming HTTP requests.
@Controller() // This decorator marks the class as a controller.
export class AppController {
  // The controller class has a constructor that injects a service called 'AppService'.
  constructor(private readonly appService: AppService) {}

  // Define a method to handle GET requests to the root URL ('/').
  @Get() // This decorator marks the method to handle GET requests.
  @Header('Content-Type', 'text/html') // This sets the 'Content-Type' header to 'text/html'.
  getHello(): { name: string } {
    // This method returns a simple object with a 'name' property containing a message.
    return { name: 'Hello From Hassan !!' }; 
  }
}

