// Importing necessary modules from the NestJS framework
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// This is an async function called 'bootstrap', which will initialize the application
async function bootstrap() {
  // Create an instance of the application using the AppModule
  const app = await NestFactory.create(AppModule);
  
  // The app starts listening for incoming requests on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to run the application
bootstrap();
