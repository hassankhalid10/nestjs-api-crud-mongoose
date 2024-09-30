// Import necessary modules from NestJS
import { Module } from '@nestjs/common';  // Basic module decorator from NestJS
import { MongooseModule } from '@nestjs/mongoose';  // Mongoose module for connecting to MongoDB

// Import controllers and services from your project
import { AppController } from './app.controller';  // Controller for handling requests and responses
import { AppService } from './app.service';  // Service that handles business logic
import { ProductsModule } from './products/products.module';  // Module for product-related logic
import { BlogsModule } from './blogs/blogs.module';  // Module for blog-related logic
import { TasksModule } from './tasks/tasks.module';  // Module for task-related logic
import { JobsModule } from './jobs/jobs.module';  // Module for job-related logic

// Define a NestJS module using the @Module decorator
@Module({
  // The imports array defines other modules that this module depends on
  // Here, we import the modules for Products, Blogs, Tasks, and Jobs. Each module likely handles specific functionality.
  imports: [
    ProductsModule,
    BlogsModule,
    TasksModule,
    JobsModule,
    // Configure MongoDB connection using MongooseModule.forRoot(), connecting to a local MongoDB database.
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/Nestjscrud'  // MongoDB connection URL (using local server)
    ),
  ],

  // The controllers array defines the controllers responsible for handling incoming HTTP requests.
  // In this case, only AppController is included.
  controllers: [AppController],

  // The providers array defines the services (business logic handlers) for the module.
  // AppService is the only service listed here.
  providers: [AppService],
})

// Export the AppModule class to be used by the NestJS framework
export class AppModule {}
