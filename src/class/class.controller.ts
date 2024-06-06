import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  createClass(@Body() createClassDto: CreateClassDto) {
    return this.classService.createClass(createClassDto);
  }

  @Delete(':id')
  deleteClass(@Param('id') id: string) { 
    return this.classService.deleteClass(id);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Patch(':id')
  addStudent(@Param('id') id: string, @Body() updateClassDto) {
    return this.classService.addStudent(id, updateClassDto);
  }


  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }*/
}
