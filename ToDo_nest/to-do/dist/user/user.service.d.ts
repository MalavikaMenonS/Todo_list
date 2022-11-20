import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(updateUserDto: UpdateUserDto): Promise<{
        id: number;
        flag: boolean;
        username: string;
    } | {
        flag: boolean;
        id?: undefined;
        username?: undefined;
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
