import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { TeacherController } from './teacher/teacher.controller';
//import { TeacherService } from './teacher/teacher.service';
import { PrismaService } from './database/prisma.service';
import { PrismaClient } from '@prisma/client';



@Module({
  imports: [

  ],
  controllers: [AppController, TeacherController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
