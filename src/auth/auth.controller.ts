import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInProps } from 'src/types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async auth(@Body() params: SignInProps) {
    console.log('params', params);

    const user = await this.authService.auth(params);
    const token = await this.authService.generateAccessToken(user);

    return { data: { ...user, token }, status: '00' };
  }
}
