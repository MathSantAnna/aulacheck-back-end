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
          data: { ...classRoom, date: new Date(), uuid: uuidv4() }
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


    return { numberOfPresence, numberOfAbsent, presencePercent: presencePercent.toFixed(2), data: presences }
  }

  async checkCall(courseId, date) {

    const requestDate = new Date(date);
    const startOfDay = new Date(requestDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(requestDate.setHours(23, 59, 59, 999));

    const rollcall = await this.prisma.classroom.findMany({
      where: {
        courseId: courseId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const period1 = rollcall.filter(record => record.period === 1);
    const period2 = rollcall.filter(record => record.period === 2);


    return {
      firstPeriod: period1.length > 0,
      secondPeriod: period2.length > 0,
      details: {
        firstPeriodRollCall: period1,
        secondPeriodRollCall: period2
      }
    };
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
