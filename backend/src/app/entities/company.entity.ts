import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

/**
  * Entity interface that represents company.
*/

@Entity({schema: 'user_company', name: 'company'})
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text'})
  description: string;

  @OneToMany(
    () => Employee,
    (employee) => employee.company,
  )
  employee: Employee[];

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}