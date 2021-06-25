import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddUserDto, ResponseDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
    tags: ['User'],
  })
  @ApiResponse({ status: 201, type: AddUserDto })
  @ApiBody({ type: AddUserDto })
  async add(@Body() addUserDto: AddUserDto) {
    return this.usersService.addUser(addUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  @ApiOperation({
    summary: 'List users',
    description: 'List all users',
    tags: ['User'],
  })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 201, type: [AddUserDto] })
  async list() {
    return this.usersService.findAll();
  }
}
