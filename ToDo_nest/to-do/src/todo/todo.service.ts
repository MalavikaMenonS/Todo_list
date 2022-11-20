import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userData: any) {
    const user = this.todoRepo.create(createTodoDto);
    return await this.todoRepo.save({
      item: createTodoDto.item,
      user: userData,
    });
  }

  async findAll() {
    return await this.todoRepo.find();
  }

  async findOne(id: number) {
    return await this.todoRepo.findOne({
      where: { id: id },
    });
  }

  async findOneUser(userData: any) {
    return await this.todoRepo.find({
      where: { user: userData },
      relations: ['user'],
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepo.update(id, updateTodoDto);
  }

  async remove(id: number) {
    return await this.todoRepo.delete(id);
  }
}
