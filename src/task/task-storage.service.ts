import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskStorageService {
  public tasks: TaskDto[] = [];

  public async addTask(task: TaskDto): Promise<TaskDto> {
    this.tasks.push(task);
    return task
  }

  public async getTask(taskId: string): Promise<TaskDto> {
    return this.tasks.find((task)=> task.id === taskId);
  }

  public async getAllTask(): Promise<TaskDto[]> {
    return this.tasks;
  }
}