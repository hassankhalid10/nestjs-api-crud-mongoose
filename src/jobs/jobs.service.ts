import { Injectable, NotFoundException } from '@nestjs/common'; // Importing necessary decorators and exceptions from NestJS
import { InjectModel } from '@nestjs/mongoose'; // Importing the InjectModel decorator for dependency injection with Mongoose
import { Model } from 'mongoose'; // Importing the Model type from Mongoose for defining database models

import { Job } from './job.model'; // Importing the Job model (assuming it's defined in a separate file)

@Injectable() // Marking this class as a service that can be injected into other parts of the application
export class JobsService {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>, // Injecting the Job model from Mongoose into the service
  ) {}

  // Method to insert a new job into the database
  async insertJob(title: string, desc: string, salary: number) {
    // Creating a new job instance with the provided details (title, description, salary)
    const newJob = new this.jobModel({
      title,
      description: desc,
      salary,
    });
    const result = await newJob.save(); // Saving the job to the database
    return result.id as string; // Returning the job's ID
  }

  // Method to retrieve all jobs from the database
  async getJobs() {
    const jobs = await this.jobModel.find().exec(); // Fetching all jobs using Mongoose's find() method
    // Mapping the jobs to a custom format and returning the list of jobs
    return jobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
    }));
  }

  // Method to retrieve a single job by its ID
  async getSingleJob(jobId: string) {
    const job = await this.findJob(jobId); // Finding the job using the private findJob method
    // Returning the found job in a formatted way
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
    };
  }

  // Method to update an existing job's details
  async updateJob(
    jobId: string,
    title: string,
    desc: string,
    salary: number,
  ) {
    const updatedJob = await this.findJob(jobId); // Finding the job to update using the private findJob method
    // Checking if each field is provided, then updating it if necessary
    if (title) {
      updatedJob.title = title;
    }
    if (desc) {
      updatedJob.description = desc;
    }
    if (salary) {
      updatedJob.salary = salary;
    }
    updatedJob.save(); // Saving the updated job back to the database
  }

  // Method to delete a job by its ID
  async deleteJob(jobId: string) {
    const result = await this.jobModel.deleteOne({ _id: jobId }).exec(); // Deleting the job using Mongoose's deleteOne() method
    if (result.n === 0) {
      throw new NotFoundException('Could not find job.'); // Throwing an error if no job was deleted (i.e., job not found)
    }
  }

  // Private helper method to find a job by its ID
  private async findJob(id: string): Promise<Job> {
    let job;
    try {
      job = await this.jobModel.findById(id).exec(); // Finding the job by its ID using Mongoose's findById() method
    } catch (error) {
      throw new NotFoundException('Could not find job.'); // Throwing an error if there was a problem during the search
    }
    if (!job) {
      throw new NotFoundException('Could not find job.'); // Throwing an error if no job was found with the given ID
    }
    return job; // Returning the found job
  }
}
