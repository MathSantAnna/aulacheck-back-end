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

    const user = await this.prisma.teacher.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // To be used when the password comes encrypted
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;

    //   return {
    //     data: {
    //       created_at: '2024-03-27 08:00:00',
    //       email: params.email,
    //       nmuser: 'Matheus Miranda Ferreira',
    //       token:
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3NjY2MjA4MDAwMDB9.Kod3Ijw_lNIv9fjbb5IwRxhn-QR5nVCokD8VZucxmP4',
    //       updated_at: '2024-03-27 08:00:00',
    //       uuiduser: '3919156b-a2f5-4c5f-b18a-5dabb715663c',
    //     },
    //     status: '00',
    //   };
  }

  async generateAccessToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
  }
}