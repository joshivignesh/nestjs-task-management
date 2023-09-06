import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { TaskEntity } from './dto/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksService.getAllTasks();
  }

  // // // @Get()
  // // // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  // // //   // if we have any filters defined, call taskService.getTaskwithFilters
  // // //   // otherwise, just get all the tasks
  // // //   if (Object.keys(filterDto).length) {
  // // //     return this.tasksService.getTasksWithFilters(filterDto);
  // // //   } else {
  // // //     return this.tasksService.getAllTasks();
  // // //   }
  // // // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
