import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
export declare class TodoService {
    private todoRepo;
    constructor(todoRepo: Repository<Todo>);
    create(createTodoDto: CreateTodoDto, userData: any): Promise<{
        item: string;
        user: any;
    } & Todo>;
    findAll(): Promise<Todo[]>;
    findOne(id: number): Promise<Todo>;
    findOneUser(userData: any): Promise<Todo[]>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
