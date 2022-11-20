import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @ManyToOne(() => User, (todo) => todo.notes)
  @JoinColumn({ name: 'userId' })
  user: User;
}
