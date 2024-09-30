import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

// This decorator defines that the class handles HTTP requests for the 'jobs' route.
@Controller('jobs')
export class JobsController {
  // Injecting the JobsService into the controller
  constructor(private readonly jobsService: JobsService) {}

  // Handling HTTP POST requests to create a new job
  @Post()
  async addJob(
    @Body('title') jobTitle: string, // Extract 'title' from the request body
    @Body('description') jobDesc: string, // Extract 'description' from the request body
    @Body('salary') jobSalary: number, // Extract 'salary' from the request body
  ) {
    // Calling the service method to insert a new job and get the generated ID
    const generatedId = await this.jobsService.insertJob(
      jobTitle,
      jobDesc,
      jobSalary,
    );
    // Return the ID of the newly created job
    return { id: generatedId };
  }

  // Handling HTTP GET requests to fetch all jobs
  @Get()
  async getAllJobs() {
    // Calling the service method to fetch all jobs
    const jobs = await this.jobsService.getJobs();
    // Return the list of jobs
    return jobs;
  }

  // Handling HTTP GET requests to fetch a specific job by its ID
  @Get(':id')
  getJob(@Param('id') jobId: string) { // Extract 'id' from the route parameters
    // Calling the service method to fetch the job by its ID
    return this.jobsService.getSingleJob(jobId);
  }

  // Handling HTTP PATCH requests to update a job by its ID
  @Patch(':id')
  async updateJob(
    @Param('id') jobId: string, // Extract 'id' from the route parameters
    @Body('title') jobTitle: string, // Extract 'title' from the request body
    @Body('description') jobDesc: string, // Extract 'description' from the request body
    @Body('salary') jobSalary: number, // Extract 'salary' from the request body
  ) {
    // Calling the service method to update the job
    await this.jobsService.updateJob(jobId, jobTitle, jobDesc, jobSalary);
    // Return null since there is no data to return
    return null;
  }

  // Handling HTTP DELETE requests to remove a job by its ID
  @Delete(':id')
  async removeJob(@Param('id') jobId: string) { // Extract 'id' from the route parameters
    // Calling the service method to delete the job by its ID
    await this.jobsService.deleteJob(jobId);
    // Return null since there is no data to return
    return null;
  }
}



//routes
//get  http://localhost:3000/jobs
//post  http://localhost:3000/jobs
//get  http://localhost:3000/jobs/id
//patch http://localhost:3000/jobs/id
//delete http://localhost:3000/jobs/id