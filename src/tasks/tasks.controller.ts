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

// Define a controller for the 'tasks' route
@Controller('tasks')
export class TasksController {
  // Inject the TasksService to access task-related functions
  constructor(private readonly tasksService: TasksService) {}

  // Endpoint to add a new task
  @Post()
  async addTask(
    @Body('title') taskTitle: string,        // Get the task title from the request body
    @Body('description') taskDesc: string,  // Get the task description from the request body
    @Body('price') taskPrice: number,       // Get the task price from the request body
  ) {
    // Call the service method to insert the new task and get the generated ID
    const generatedId = await this.tasksService.insertTask(
      taskTitle,
      taskDesc,
      taskPrice,
    );
    // Return the generated ID as a response
    return { id: generatedId };
  }

  // Endpoint to retrieve all tasks
  @Get()
  async getAllTasks() {
    // Call the service method to get all tasks
    const tasks = await this.tasksService.getTasks();
    // Return the list of tasks
    return tasks;
  }

  // Endpoint to retrieve a single task by its ID
  @Get(':id')
  getTask(@Param('id') taskId: string) {
    // Call the service method to get a single task by ID
    return this.tasksService.getSingleTask(taskId);
  }

  // Endpoint to update a task by its ID
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,              // Get the task ID from the request parameters
    @Body('title') taskTitle: string,        // Get the new task title from the request body
    @Body('description') taskDesc: string,   // Get the new task description from the request body
    @Body('price') taskPrice: number,        // Get the new task price from the request body
  ) {
    // Call the service method to update the task
    await this.tasksService.updateTask(taskId, taskTitle, taskDesc, taskPrice);
    // Return null since no data needs to be sent back
    return null;
  }

  // Endpoint to remove a task by its ID
  @Delete(':id')
  async removeTask(@Param('id') taskId: string) {
      // Call the service method to delete the task
      await this.tasksService.deleteTask(taskId);
      // Return null since no data needs to be sent back
      return null;
  }
}

//routes
//get  http://localhost:3000/tasks
//post  http://localhost:3000/tasks
//get  http://localhost:3000/tasks/id
//patch http://localhost:3000/tasks/id
//delete http://localhost:3000/tasks/id