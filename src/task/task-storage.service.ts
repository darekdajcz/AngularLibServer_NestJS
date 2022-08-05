import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './interface/task.model';

@Injectable()
export class TaskStorageService {
  public tasks: Task[] = [];

  public async addTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  public async getTask(taskId: string): Promise<Task> {
    return this.tasks.find((task) => task.id === taskId);
  }

  public async getAllTask(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }
}