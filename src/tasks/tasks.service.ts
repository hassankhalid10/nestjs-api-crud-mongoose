import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,     //here model is injected from modules
  ) {}

  async insertTask(title: string, desc: string, price: number) {
    const newTask = new this.taskModel({
      title,
      description: desc,
      price,
    });
    const result = await newTask.save();
    return result.id as string;
  }

  async getTasks() {
    const tasks = await this.taskModel.find().exec();
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      price: task.price,
    }));
  }

  async getSingleTask(taskId: string) {
    const task = await this.findTask(taskId);
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      price: task.price,
    };
  }

  async updateTask(
    taskId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedTask = await this.findTask(taskId);
    if (title) {
      updatedTask.title = title;
    }
    if (desc) {
      updatedTask.description = desc;
    }
    if (price) {
      updatedTask.price = price;
    }
    updatedTask.save();
  }

  async deleteTask(prodId: string) {
    const result = await this.taskModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find task.');
    }
  }

  private async findTask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find task.');
    }
    if (!task) {
      throw new NotFoundException('Could not find task.');
    }
    return task;
  }
}
