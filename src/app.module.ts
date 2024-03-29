import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [TeacherModule],
  controllers: [AppController, TeacherController],
  providers: [AppService, TeacherService],
})
export class AppModule {}
