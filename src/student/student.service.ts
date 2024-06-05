import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ClassroomService } from 'src/classroom/classroom.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService, private readonly classroomService: ClassroomService) { }
   async create(createStudentDto: CreateStudentDto) {
    return await this.prisma.student.create({data: {...createStudentDto, uuid: uuidv4(), created_at: new Date(), updated_at: new Date()}});
  }

  async getStudents() {
    return await this.prisma.student.findMany();
  }

  async getStudentById(id: string) {
    const uuid = id;
        const student = await this.prisma.student.findUnique({
            where: {
              uuid,
            },
          });
      
          if (!student) {
            throw new NotFoundException(`Teacher with UUID ${uuid} not found`);
          }
      
          return student;
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    const uuid = id
    console.log(uuid);
    
    return await this.prisma.student.update({
      where: { uuid },
      data: {
          ...updateStudentDto
      }
  });
  }

  async deleteStudent(id: string) {
    const uuid = id
    return await this.prisma.student.delete({
      where: {
        uuid,
      },
    });
  }

  async getStudentsByCourse(courseId: string) {

    const studentWithFrequence = [];

    const course = await this.prisma.course.findUnique({
      where: { uuid: courseId }
    })

    const courseClassId = course.classId

    const students = await this.prisma.student.findMany({
      where: { classId: courseClassId },
    });

    for (const student of students) {
      const frequence = await this.classroomService.getPresenceByStudent(courseId, student.uuid);
      const classroomDetails = {
        frequence: frequence.presencePercent === "NaN" ? "100%" : frequence.presencePercent,
        numberOfPresence: frequence.numberOfPresence,
        numberOfAbsent: frequence.numberOfAbsent,
        history: frequence.data
      }

      studentWithFrequence.push({ ...student, classroomDetails })
    }

    return studentWithFrequence;
  }

async getStudentsByClass(classId: string) {
  return this.prisma.student.findMany({
      where: { classId: classId },
  });
}

}
