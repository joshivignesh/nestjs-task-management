import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './dto/task.entity';
import { TaskRepository } from './dto/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
