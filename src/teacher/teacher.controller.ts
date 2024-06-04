import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'


@Controller('teachers')
export class TeacherController {
    constructor(private readonly prisma: PrismaService) { }



    @Get()
    async getTeachers() {
        return await this.prisma.teacher.findMany();
    }

    @Get('/:uuid')
    async getTeacherById(
        @Param() teacherId
    ) {
        const uuid = teacherId.uuid;
        const teacher = await this.prisma.teacher.findUnique({
            where: {
              uuid,
            },
          });
      
          if (!teacher) {
            throw new NotFoundException(`Teacher with UUID ${uuid} not found`);
          }
      
          return teacher;
    }

    @Post()
    async createTeacher(
        @Body('nmteacher') nmteacher: string,
        @Body('email') email: string,
        @Body('admin') admin: boolean,
    ) {
        return this.prisma.teacher.create({
            data: {
                uuid: uuidv4(),
                nmteacher,
                email,
                created_at: new Date(),
                updated_at: new Date(),
                admin
            }
        });
    }

    @Put('/:uuid')
    async updateTeacher(
        @Param() teacherId,
        @Body('nmteacher') nmteacher: string,
        @Body('email') email: string,
    ) {
        const uuid = teacherId.uuid;
        return this.prisma.teacher.update({
            where: { uuid },
            data: {
                nmteacher,
                email,
                updated_at: new Date(),
            }
        });
    }

    @Delete('/:uuid')
    async deleteTeacher(
        @Param() teacherId 
    ) {
        const uuid = teacherId.uuid;
        await this.prisma.teacher.delete({
            where: {
              uuid,
            },
          });
    }

    @Get('course/:courseId')
    async getTeacherByCourse(@Param('courseId') courseId: string) {
      const course = await this.prisma.course.findUnique({
        where: { uuid: courseId },
        include: { teacher: true },
      });
  
      if (!course) {
        throw new NotFoundException(`Course with UUID ${courseId} not found`);
      }
  
      return course.teacher;
    }
}




