import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return {
      message: 'Hello, logged in',
    };
  }

  signup() {
    return {
      message: 'Hello, signed up',
    };
  }
}
