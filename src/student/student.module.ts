import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ClassroomService } from 'src/classroom/classroom.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, ClassroomService],
})
export class StudentModule {}
