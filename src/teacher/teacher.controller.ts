import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { uuid } from 'uuidv4';


@Controller('teachers')
export class TeacherController {
    constructor(private readonly prisma: PrismaService) { }



    @Get()
    async getTeachers() {
        return await this.prisma.teacher.findMany();
    }

    @Post()
    async createTeacher(
        @Body('nmteacher') nmteacher: string,
        @Body('email') email: string,
    ) {
        return this.prisma.teacher.create({
            data: {
                uuid: uuid(),
                nmteacher,
                email,
                created_at: new Date(),
                updated_at: new Date()
            }
        });
    }

}




