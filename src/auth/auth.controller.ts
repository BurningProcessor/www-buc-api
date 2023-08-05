import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService  
  ) {}

  @Post('login')
  @UseGuards(LocalStrategy)
  async login(@Request() req) {
    return req.user
  }
}
