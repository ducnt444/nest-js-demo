import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST: auth/login
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  // POST: auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  // EXPRESS
  // @Post('signup')
  // signup(@Req() req: Request) {
  //  console.log(req.headers)
  //   return this.authService.signup();
  // }
}
