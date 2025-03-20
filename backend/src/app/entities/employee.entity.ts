import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Company } from './company.entity';
import { User } from './user.entity';

/**
  * Entity interface that represents employee.
*/

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
 
  @ManyToOne((type) => User, (user) => user.id, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Company, (company) => company.id, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne((type) => Role, (role) => role.id, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}