import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
//import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teatcher.entity';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [  
  ],
  controllers: [TeacherController],
  providers: [PrismaService],

})
export class TeacherModule {}
