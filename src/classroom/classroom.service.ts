import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ClassroomService {
constructor(private readonly prisma: PrismaService) { }
 async create(createClassRooms: CreateClassroomDto[]) {
    for (const classRoom of createClassRooms) {
      await this.prisma.classroom.create(
        {
          data: {...classRoom, date: new Date(), uuid: uuidv4()}
        }
      )
    }
    return 'This action adds a new classroom';
  }

  async getPresenceByStudent(courseId: string, studentId: string) {
    
        const presences = await this.prisma.classroom.findMany({
            where: {
              courseId,
              studentId
            },
          });
      
          if (!presences) {
            throw new NotFoundException(`Student with UUID ${studentId} not found`);
          }

          let numberOfPresence = 0;
          let numberOfAbsent = 0;

          for (const presence of presences) {
            if (presence.presence) {
              numberOfPresence++
            } else {
              numberOfAbsent++
            }
          }

          const presencePercent = (numberOfPresence / (numberOfPresence + numberOfAbsent)) * 100;

      
         return { numberOfPresence, numberOfAbsent, presencePercent:presencePercent.toFixed(2), data: presences }
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
