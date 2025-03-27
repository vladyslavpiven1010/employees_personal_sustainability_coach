import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { ERole } from '../jwt-auth.guard';

/**
  * Entity interface that represents role.
*/

@Entity({schema: 'user_company', name: 'role'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: ERole;

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