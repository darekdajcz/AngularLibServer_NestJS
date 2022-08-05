import { Injectable } from '@nestjs/common';
import { Task } from './interface/task.model';

@Injectable()
export class TaskStorageService {
  tasks: Task[] = [];

  async addTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  async getTask(taskId: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === taskId);
    return Promise.resolve(task);
  }

  async getAllTask(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  deleteTask(taskId: string): Promise<Task[]> {
    this.tasks = this.tasks.filter(task => task.id !== taskId)
    return Promise.resolve(this.tasks);
  }
}