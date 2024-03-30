import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInProps } from 'src/types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async auth(@Body() params: SignInProps) {
    console.log('params', params);

    return this.authService.auth(params);
  }
}
