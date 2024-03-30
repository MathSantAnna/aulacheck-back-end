import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/database/prisma.service';
import { uuid } from 'uuidv4';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
   async create(createStudentDto: CreateStudentDto) {
    return await this.prisma.student.create({data: {...createStudentDto, uuid: uuid(), created_at: new Date(), updated_at: new Date()}});
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
}
