import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard) // guarded by 'jwt-access' strategy
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
