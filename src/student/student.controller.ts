import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService,
  ) { }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.getStudents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }

  @Get('course/:courseId')
  async getStudentsByCourse(@Param('courseId') courseId: string) {
      return this.studentService.getStudentsByCourse(courseId);
  }

  @Get('class/:classId')
  async getStudentsByClass(@Param('classId') classId: string) {
      return this.studentService.getStudentsByClass(classId);
  }
}
