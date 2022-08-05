import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskStorageService } from './task-storage.service';

@Injectable()
export class TaskService {

  constructor(private readonly taskStorageService: TaskStorageService) {
  }

  public async addTask(task: TaskDto): Promise<TaskDto> {
    return this.taskStorageService.addTask(task);
  }

  public async getTask(taskId: string): Promise<TaskDto> {
    return this.taskStorageService.getTask(taskId);

  }

  public async getAllTask(): Promise<TaskDto[]> {
    return this.taskStorageService.getAllTask();

  }
}