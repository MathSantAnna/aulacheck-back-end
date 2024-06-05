import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Controller()
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) { }

  @Post("classroom/presence")
  create(@Body() createClassroomDto: CreateClassroomDto[]) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get("classroom/:courseId/:studentId")
  getPresenceByStudent(@Param('courseId') courseId: string, @Param('studentId') studentId: string) {

    return this.classroomService.getPresenceByStudent(courseId, studentId);
  }

  @Post("checkCall")
  checkCall(@Body() checkBody: any) {
    return this.classroomService.checkCall(checkBody.courseId, checkBody.date)
  }

  @Get('classroom/:id')
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id);
  }

  @Patch('classroom/:id')
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete('classroom/:id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}