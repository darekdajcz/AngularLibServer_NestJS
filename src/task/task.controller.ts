// localhost:3000/products
import { Body, Controller, Delete, Get, Param, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto, TaskParamDto } from './dto/task.dto';
import { Response } from 'express';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TaskService) {
  }

  @Get('')
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTask();
    return res.status(200).send(data);
  }

  @Get(':id')
  async getTask(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    const data = await this.taskService.getTask(reqParam.id);
    return res.status(200).send(data);
  }

  @Delete(':id')
  async deleteTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    const data = await this.taskService.deleteTask(reqParam.id);
    return res.status(200).send(data);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}
