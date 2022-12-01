import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard) // guarded by 'jwt-access' strategy
@Controller('users')
export class UserController {
  // // GET /users/me LEGACY
  // @Get('me')
  // getMe(@Req() req: Request) {
  //   // returned from strategy's validate
  //   return req.user;
  // }

  // GET /users/me
  @Get('me')
  getMe(
    @GetUser() user: User,
    // @GetUser('email') email: string
  ) {
    // returned from strategy's validate
    return user;
  }

  // PATCH /users/me
  // @Patch('me')
  // editUser() {}
}
