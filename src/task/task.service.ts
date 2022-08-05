import { Injectable } from '@nestjs/common';
import { TaskStorageService } from './task-storage.service';
import { Task } from './interface/task.model';
import { uuid } from 'uuidv4';

@Injectable()
export class TaskService {

  constructor(private readonly taskStorageService: TaskStorageService) {
  }

  public async addTask(task: Task): Promise<Partial<Task>> {
    task.id = uuid();
    task.completed = false;
    task.description = 'xXxXXxXx';
    task.owner = 'Darek';
    task.duration = 21;
    return this.taskStorageService.addTask(task);
  }

  public async getTask(taskId: string): Promise<Task> {
    return this.taskStorageService.getTask(taskId);

  }

  public async getAllTask(): Promise<Task[]> {
    return this.taskStorageService.getAllTask();

  }
}