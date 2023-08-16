import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TaskdataService } from './taskdata/taskdata.service';

@Module({
  imports: [TasksModule],
  providers: [TaskdataService],
})
export class AppModule {}
