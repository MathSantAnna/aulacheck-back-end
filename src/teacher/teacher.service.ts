import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

   @Injectable()
   export class TeacherService {
       constructor(private prisma: PrismaService) {}

       async getTeacherByCourse(courseId: string) {
           const course = await this.prisma.course.findUnique({
               where: { uuid: courseId },
               include: { teacher: true },
           });
           return course ? course.teacher : null;
       }
   }