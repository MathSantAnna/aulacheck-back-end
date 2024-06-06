import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignInProps } from 'src/types/auth';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(readonly prisma: PrismaService) { }
  async auth(params: SignInProps) {

    const { email, password } = params;

    const userTeacher = await this.prisma.teacher.findUnique({
      where: { email },
    });


    const userStudent = await this.prisma.student.findUnique({
      where: { email },
    });


    if (!userTeacher && !userStudent) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = userTeacher || userStudent;

    // To be used when the password comes encrypted
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;

  }

  async generateAccessToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
  }
}