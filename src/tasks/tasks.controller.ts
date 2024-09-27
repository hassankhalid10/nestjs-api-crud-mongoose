import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async addTask(
    @Body('title') taskTitle: string,
    @Body('description') taskDesc: string,
    @Body('price') taskPrice: number,
  ) {
    const generatedId = await this.tasksService.insertTask(
      taskTitle,
      taskDesc,
      taskPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Get(':id')
  getTask(@Param('id') taskId: string) {
    return this.tasksService.getSingleTask(taskId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('description') taskDesc: string,
    @Body('price') taskPrice: number,
  ) {
    await this.tasksService.updateTask(taskId, taskTitle, taskDesc, taskPrice);
    return null;
  }

  @Delete(':id')
  async removeTask(@Param('id') taskId: string) {
      await this.tasksService.deleteTask(taskId);
      return null;
  }
}
//routes
//get  http://localhost:3000/tasks
//post  http://localhost:3000/tasks
//get  http://localhost:3000/tasks/id
//patch http://localhost:3000/tasks/id
//delete http://localhost:3000/tasks/id