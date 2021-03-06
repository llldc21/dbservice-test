import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async addUser(data: AddUserDto): Promise<User> {
    return this.usersRepository.save(data);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
