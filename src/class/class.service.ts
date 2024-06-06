import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) { }

  async createClass(createClassDto: CreateClassDto) {
    return await this.prisma.class.create({ data: { ...createClassDto, uuid: uuidv4() } });
  }

  //delete

  async deleteClass(uuid: string) { 
    return await this.prisma.class.delete({ where: { uuid } });
  }

  async findAll() {
    return await this.prisma.class.findMany();
  }

  async addStudent(id: string, students: string[]) {
    return "WIP"
  }
}

  /* findOne(id: number) {
    return `This action returns a #${id} class`;
  }

 

  remove(id: number) {
    return `This action removes a #${id} class`;
  } */

