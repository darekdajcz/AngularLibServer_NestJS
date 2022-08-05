import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStorageService } from './task-storage.service';
import { TasksController } from './task.controller';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TaskService, TaskStorageService]
})
export class TaskModule {
}