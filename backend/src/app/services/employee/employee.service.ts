import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee } from 'src/app/entities';
import { DataSource } from 'typeorm';
import { ERole } from 'src/app/jwt-auth.guard';

@Injectable()
export class EmployeeService {
  private employeeRepository;
  private roleRepository;

  constructor(private dataSource: DataSource) {
    this.employeeRepository = this.dataSource.getRepository(Employee);
    this.roleRepository = this.dataSource.getRepository(Employee);
  }

  async updateUserRole(id: number, role: ERole) {
    const employee: Employee = await this.employeeRepository.findOneById(id);
    if (!employee) throw new BadRequestException(`Employee with this id ${id} does not exist`);

    employee.role = await this.roleRepository.findOneBy({name: role});
    await this.employeeRepository.update(employee.id, employee);
    await this.employeeRepository.save(employee);
  }
}
