import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { CourseModule } from './course/course.module';
import { ClassroomModule } from './classroom/classroom.module';


@Module({
  imports: [TeacherModule, AuthModule, StudentModule, ClassModule, CourseModule, ClassroomModule],
  controllers: [AppController, TeacherController, AuthController],
  providers: [AppService, TeacherService, AuthService, PrismaService],
})
export class AppModule {}
