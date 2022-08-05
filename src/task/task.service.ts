import { Injectable, ParseBoolPipe } from '@nestjs/common';
import { TaskStorageService } from './task-storage.service';
import { Task } from './interface/task.model';
import { uuid } from 'uuidv4';

@Injectable()
export class TaskService {

  constructor(private readonly taskStorageService: TaskStorageService) {
  }

   async addTask(task: Task): Promise<Task> {
    task.id = uuid();
    task.completed = false;
    task.description = 'xXxXXxXx';
    task.owner = 'Darek';
    task.duration = 21;
    return this.taskStorageService.addTask(task);
  }

   async getTask(taskId: string): Promise<Task> {
    return this.taskStorageService.getTask(taskId);
  }

   async getAllTask(): Promise<Task[]> {
    return this.taskStorageService.getAllTask();
  }

  async filterAllTasks(filter: boolean): Promise<Task[]> {
    return this.taskStorageService.filterAllTasks(filter);
  }

  async deleteTask(taskId: string) {
    return this.taskStorageService.deleteTask(taskId);
  }
}