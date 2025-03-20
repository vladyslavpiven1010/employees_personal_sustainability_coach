import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities';
import { DataSource } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  private userRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("employee.user_id", "user")
      .leftJoinAndSelect("employee.company_id", "company")
      .leftJoinAndSelect("employee.role_id", "role")
      .getMany();
  }

  async findCompanyMembers(company_id: number): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("employee.user_id", "user")
      .leftJoinAndSelect("employee.company_id", "company")
      .leftJoinAndSelect("employee.role_id", "role")
      .where("employee.company_id = :company_id", { company_id: company_id })
      .getMany();
  }

  async findFreeUsers(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("employee.user_id", "user")
      .leftJoinAndSelect("employee.company_id", "company")
      .leftJoinAndSelect("employee.role_id", "role")
      .where("employee.role_id = ")
      .getMany();
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("employee.user_id", "user")
      .leftJoinAndSelect("employee.company_id", "company")
      .leftJoinAndSelect("employee.role_id", "role")
      .where("user.id = :id", { id: id })
      .getOne();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("employee.user_id", "user")
      .leftJoinAndSelect("employee.company_id", "company")
      .leftJoinAndSelect("employee.role_id", "role")
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      created_at: new Date(),
      deleted_at: null
    }

    const result = await this.userRepository.create(newUser);
    return await this.userRepository.save(result);
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.softdelete(id);
  }

  async countCompanyMembers(companyId: number): Promise<number> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("employee.user_id", "user")
      .leftJoinAndSelect("employee.company_id", "company")
      .leftJoinAndSelect("employee.role_id", "role")
      .where("employee.company_id = :company_id", { company_id: companyId })
      .getCount();
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id } );
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }
}
