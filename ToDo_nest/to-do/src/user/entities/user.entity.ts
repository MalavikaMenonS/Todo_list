import { Todo } from 'src/todo/entities/todo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  Password: string;

  @OneToMany(() => Todo, (note) => note.user)
  //   @JoinColumn({ name: 'userId' })
  notes: Todo[];
}
