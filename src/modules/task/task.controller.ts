// localhost:3000/products
import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpException, HttpStatus,
  InternalServerErrorException,
  Param, ParseBoolPipe,
  Post, Query,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { TaskService } from './task.service';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';
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
  @UsePipes(new ValidationPipe())
  async getTask(@Param() reqParam: TaskParamDto) {
    return await this.taskService.getTask(reqParam.id);
  }

  @Get('/filter/data')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async filterTaskById(@Query() reqParam: QueryParamDto, @Res() res: Response) {
    return await this.taskService.filterAllTasks(reqParam.filter);
  }

  @Delete(':id')
  async deleteTaskById(@Param() reqParam: TaskParamDto) {
    return await this.taskService.deleteTask(reqParam.id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}
