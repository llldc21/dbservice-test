import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddUserDto, ResponseDto } from './users/user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'User login',
    description: 'Make user login',
    tags: ['Auth'],
  })
  @ApiResponse({ status: 201, type: ResponseDto })
  @ApiBody({ type: AddUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
