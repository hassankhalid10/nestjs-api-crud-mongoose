import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import the controller, service, and schema related to the Blogs module
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogSchema } from './blog.model';

@Module({
  imports: [
    // MongooseModule.forFeature() is used to define a Mongoose model based on a schema.
    // It takes an array with a single object as an argument, where 'name' is the name of the model ('Blog'),
    // and 'schema' is the schema to use (BlogSchema). This allows you to work with 'Blog' as a Mongoose model in this module.
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  controllers: [BlogsController],   // Include the controller for handling HTTP requests
  providers: [BlogsService],         // Include the service for business logic
})
export class BlogsModule {}  // Export the BlogsModule class so that it can be imported and used in other parts of your application.
