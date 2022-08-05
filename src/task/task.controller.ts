// localhost:3000/products
import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { Response } from 'express';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TaskService) {
  }

  @Get('')
  async getAllTasks(@Res() res: Response) {
    const data = this.taskService.getAllTask();
    return res.status(200).send(data);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = this.taskService.addTask(task);
    return res.status(200).send(data);

  }

}
