import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  @Get('teacher/:teacherId')
  async getCoursesByTeacher(@Param('teacherId') teacherId: string) {
    return this.courseService.getCoursesByTeacher(teacherId);
  }

  @Get('student/:studentId')
  async getCoursesByStudent(@Param('studentId') studentId: string) {
      return this.courseService.getCoursesByStudent(studentId);
  }

  @Get('class/:classId')
       async getCoursesByClass(@Param('classId') classId: string) {
           return this.courseService.getCoursesByClass(classId);
       }


}
