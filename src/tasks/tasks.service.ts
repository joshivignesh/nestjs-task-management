import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TaskEntity } from './dto/task.entity';
import { EntityManager } from 'typeorm';
import { TaskRepository } from './dto/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectEntityManager()
    private taskManager: EntityManager,
    // @InjectRepository(TaskEntity) //
    // private taskRepository: Repository<TaskEntity>,
    private readonly taskRepository: TaskRepository,
  ) {}

  private tasks: TaskEntity[] = [];

  async getAllTasks(): Promise<TaskEntity[]> {
    const record = this.taskRepository.find();
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const record = await this.taskRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }
  //const found = await this.taskRepository.findOneBy({id: id});

  // // // getTaskById(id: string) {
  // // //   const found = this.tasks.find((task) => task.id === id);
  // // //   if (!found) {
  // // //     throw new NotFoundException(`Task with ID "${id}" not found`);
  // // //   }
  // // //   return found;
  // // // }

  // // // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  // // //   const { status, search } = filterDto;

  // // //   // define a temporary array to hold result
  // // //   let tasks = this.getAllTasks();

  // // //   // do something with status
  // // //   if (status) {
  // // //     tasks = tasks.filter((task) => task.status == status);
  // // //   }

  // // //   // do something with search
  // // //   if (search) {
  // // //     tasks = tasks.filter((task) => {
  // // //       if (task.title.includes(search) || task.description.includes(search)) {
  // // //         return true;
  // // //       }
  // // //       return false;
  // // //     });
  // // //   }
  // // //   // return final result
  // // //   return tasks;
  // // // }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    if (task) {
      (await task).taskstatus = status;
      const taskrep = this.taskRepository.save(await task);
      return taskrep;
    }
  }

  async deleteTask(id: string): Promise<void> {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(
      async (task) => task.id !== (await found).id,
    );
  }
}
