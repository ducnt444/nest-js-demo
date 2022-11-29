import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST: auth/login
  @Post('login')
  login() {
    return this.authService.login();
  }

  // POST: auth/signup
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
