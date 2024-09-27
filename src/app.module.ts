// Import necessary modules from NestJS
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import controllers and services from your project
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BlogsModule } from './blogs/blogs.module';
import { TasksModule } from './tasks/tasks.module';

// Define a NestJS module using the @Module decorator
@Module({
  // Specify the modules that this module depends on using the imports property.
  // Import ProductsModule, BlogsModule, and TasksModule. These modules likely contain their own controllers and services.
  imports: [
    ProductsModule,
    BlogsModule,
    TasksModule,
    
    // Configure the MongooseModule to connect to a MongoDB database.
    // MongooseModule.forRoot() method takes the MongoDB connection URL as its argument.
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/Nestjscrud'
    ),
  ],

  // Specify the controllers that are part of this module.
  // In this case, there's only one controller, AppController.
  controllers: [AppController],

  // Specify the providers (services) that are part of this module.
  // In this case, there's only one provider, AppService.
  providers: [AppService],
})

// Export the AppModule class so that it can be used in other parts of your application.
export class AppModule {}
