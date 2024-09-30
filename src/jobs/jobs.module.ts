import { Module } from '@nestjs/common'; 
import { MongooseModule } from '@nestjs/mongoose';

import { JobsController } from './jobs.controller'; 
import { JobsService } from './jobs.service'; 
import { JobSchema } from './job.model';

@Module({
  imports: [
    // Import the MongooseModule and connect it with the Job schema
    // This will automatically create a MongoDB model based on the 'Job' schema
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
  ],
  controllers: [
    // Specify the JobsController which will handle HTTP requests for this module
    JobsController
  ],
  providers: [
    // Specify the JobsService which will contain the business logic for this module
    JobsService
  ],
})
export class JobsModule {
  // This is the main module for handling 'Job' data.
  // It combines the controller, service, and database model (schema).
}
