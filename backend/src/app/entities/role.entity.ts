import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

/**
  * Entity interface that represents role.
*/

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'varchar', length: 16})
  permissions: string;

  @OneToMany(
    () => Employee,
    (employee) => employee.role,
  )
  employee: Employee[];
}