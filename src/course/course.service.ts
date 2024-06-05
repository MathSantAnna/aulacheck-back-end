import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({ data: { ...createCourseDto, uuid: uuidv4() } });
  }

  async findAll() {
    const courses = await this.prisma.course.findMany();
    let coursesDetailed = [];

    for (const course of courses) {
      const teacher = await this.prisma.teacher.findUnique({
        where: {
          uuid: course.teacherId || ''
        }
      });

      const courseClass = await this.prisma.class.findUnique({
        where: {
          uuid: course.classId || ''
        }
      });

      const courseDetailed = { ...course, nmteacher: teacher.nmteacher, nmclass: courseClass.nmclass }

      coursesDetailed.push(courseDetailed)

      console.log(coursesDetailed)
    }

    return coursesDetailed;
  }

  async findOne(id: string) {
    const uuid = id;
    const course = await this.prisma.course.findUnique({
      where: {
        uuid,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with UUID ${uuid} not found`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const uuid = id
    console.log(uuid);

    return await this.prisma.course.update({
      where: { uuid },
      data: {
        ...updateCourseDto
      }
    });
  }

  async remove(id: string) {
    const uuid = id
    return await this.prisma.course.delete({
      where: {
        uuid,
      },
    });
  }

  async getCoursesByTeacher(teacherId: string) {
    return this.prisma.course.findMany({
      where: { teacherId: teacherId },
    });
  }

  async getCoursesByStudent(studentId: string) {
    return this.prisma.course.findMany({
        where: { classrooms: { some: { studentId: studentId } } },
    });
}

async getCoursesByClass(classId: string) {
  return this.prisma.course.findMany({
      where: { classId: classId },
  });
}

}
