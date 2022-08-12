import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (task) {
      return Promise.resolve(task);
    }
    throw new NotFoundException('task not founded');
  }

  async getAllTask(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  deleteTask(taskId: string): Promise<Task[]> {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new NotFoundException('task not founded');
    }
    this.tasks = this.tasks.filter((task) => task.id === taskId);
    return Promise.resolve(this.tasks);
  }

  filterAllTasks(filter: boolean): Promise<Task[]> {
    if (!filter) {
      return Promise.resolve(this.tasks);
    }

    return Promise.resolve(this.tasks.sort((a: any, b: any) => a.name - b.name));
  }
}