import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee, Role } from 'src/app/entities';
import { DataSource } from 'typeorm';
import { ERole } from 'src/app/jwt-auth.guard';

@Injectable()
export class EmployeeService {
  private employeeRepository;
  private roleRepository;

  constructor(private dataSource: DataSource) {
    this.employeeRepository = this.dataSource.getRepository(Employee);
    this.roleRepository = this.dataSource.getRepository(Role);
  }

  async isUserCompanyEmployee(userId: number, companyId: number): Promise<boolean> {
    const employee = await this.employeeRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    });

    return !!employee;
  }

  async isCompanyEmployeeExist(employeeId: number, companyId: number): Promise<boolean> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId, company: { id: companyId } },
    });

    return !!employee;
  }

  async getCompanyEmployees(companyId: number): Promise<Employee[]> {
    return await this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.company_id = :companyId', { companyId })
      .getMany() as Employee[];
  }

  async getUserEmployees(userId: number): Promise<Employee[]> {
    const employees = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.user', 'user')
      .leftJoinAndSelect('employee.company', 'company')
      .leftJoinAndSelect('employee.role', 'role')
      .where('employee.user_id = :userId', { userId })
      .getMany() as Employee[];
      
      return employees;
  }

  async getCompanyEmployee(companyId: number, userId: number): Promise<Employee> {
    return await this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.company_id = :companyId', { companyId })
      .andWhere('employee.user_id = :userId', { userId })
      .getOne() as Employee;
  }

  async updateEmployeeRole(id: number, role: ERole) {
    const employee: Employee = await this.employeeRepository.findOneById(id);
    if (!employee) throw new BadRequestException(`Employee with this id ${id} does not exist`);


    employee.role = await this.roleRepository.findOneBy({name: role});
    
    await this.employeeRepository.update(employee.id, employee);
    await this.employeeRepository.save(employee);
  }

  async createEmployee(userId: number, companyId: number, role: ERole): Promise<Employee> {
    const existingEmployee = await this.getCompanyEmployee(companyId, userId);
  
    if (existingEmployee) {
      throw new BadRequestException('User already has a role in this company.');
    }
    
    const employeeRole = await this.roleRepository.findOneBy({name: role});
    const employee = this.employeeRepository.create({
      user: { id: userId }, 
      company: { id: companyId }, 
      role: employeeRole
    });
  
    return await this.employeeRepository.save(employee);
  }

  async removeEmployee(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
