import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './task.model';

// This service handles task-related operations.
@Injectable()
export class TasksService {
  // The constructor injects the Task model from Mongoose.
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>, // Injecting the Task model
  ) {}

  // This method creates and saves a new task with the given title, description, and price.
  async insertTask(title: string, desc: string, price: number) {
    const newTask = new this.taskModel({
      title,
      description: desc,
      price,
    });
    const result = await newTask.save(); // Saving the new task to the database
    return result.id as string; // Returning the ID of the new task
  }

  // This method retrieves all tasks from the database.
  async getTasks() {
    const tasks = await this.taskModel.find().exec(); // Fetching tasks
    return tasks.map(task => ({
      id: task.id, // Mapping each task to a simpler format
      title: task.title,
      description: task.description,
      price: task.price,
    }));
  }

  // This method retrieves a single task by its ID.
  async getSingleTask(taskId: string) {
    const task = await this.findTask(taskId); // Finding the task by ID
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      price: task.price,
    };
  }

  // This method updates an existing task's details.
  async updateTask(
    taskId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedTask = await this.findTask(taskId); // Finding the task to update
    if (title) {
      updatedTask.title = title; // Updating the title if provided
    }
    if (desc) {
      updatedTask.description = desc; // Updating the description if provided
    }
    if (price) {
      updatedTask.price = price; // Updating the price if provided
    }
    updatedTask.save(); // Saving the updated task
  }

  // This method deletes a task by its ID.
  async deleteTask(prodId: string) {
    const result = await this.taskModel.deleteOne({_id: prodId}).exec(); // Deleting the task
    if (result.n === 0) { // If no task was found to delete
      throw new NotFoundException('Could not find task.'); // Throwing an error
    }
  }

  // This private method finds a task by its ID and returns it.
  private async findTask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.taskModel.findById(id).exec(); // Finding the task
    } catch (error) {
      throw new NotFoundException('Could not find task.'); // Throwing an error if the task is not found
    }
    if (!task) {
      throw new NotFoundException('Could not find task.'); // Throwing an error if the task is still null
    }
    return task; // Returning the found task
  }
}
