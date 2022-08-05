// localhost:3000/products
import { Controller, Get, Post, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { Response } from 'express';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TaskService) {
  }

  @Get('')
  async getAllTasks(@Res() res: Response) {
    const data = this.taskService.getAllTask()
    return res.status(200).send(data);
  }

}
