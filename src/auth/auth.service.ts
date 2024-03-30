import { Injectable } from '@nestjs/common';
import { SignInProps } from 'src/types/auth';

@Injectable()
export class AuthService {
  auth(params: SignInProps) {
    return {
      data: {
        created_at: '2024-03-27 08:00:00',
        email: params.email,
        nmuser: 'Matheus Miranda Ferreira',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3NjY2MjA4MDAwMDB9.Kod3Ijw_lNIv9fjbb5IwRxhn-QR5nVCokD8VZucxmP4',
        updated_at: '2024-03-27 08:00:00',
        uuiduser: '3919156b-a2f5-4c5f-b18a-5dabb715663c',
      },
      status: '00',
    };
  }
}
