import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll(updateUserDto: UpdateUserDto) {
    const userData = await this.userRepo.findOne({
      where: { firstName: updateUserDto.firstName },
    });
    if (userData) {
      if (userData.Password === updateUserDto.password) {
        return { id: userData.id, flag: true, username: userData.firstName };
      } else {
        return { flag: false };
      }
    } else {
      return { flag: false };
    }
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
