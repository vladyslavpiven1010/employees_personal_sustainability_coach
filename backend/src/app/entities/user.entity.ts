import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Token } from './token.entity';

/**
  * Entity interface that represents user.
*/

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'varchar', length: 255, unique: true})
  email: string;
  
  @Column({type: 'varchar', length: 128})
  password: string;

  @OneToMany(
    () => Employee,
    (employee) => employee.user,
  )
  employee: Employee[];

  @OneToMany(
    () => Token,
    (token) => token.user,
  )
  token: Token[];

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}