import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskStatus } from '../task.status-enum';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async createTask({ title, description }: CreateTaskDto): Promise<TaskEntity> {
    const task = this.create({
      title,
      description,
      taskstatus: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
