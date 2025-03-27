import { Injectable } from '@nestjs/common';
import { Company } from 'src/app/entities';
import { DataSource } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CompanyService {
  private companyRepository;

  constructor(private dataSource: DataSource, private userService: UserService) {
    this.companyRepository = this.dataSource.getRepository(Company);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id });
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    const newCompany: Company = this.companyRepository.create({
      ...company,
      created_at: new Date(),
      deleted_at: null
    });

    await this.companyRepository.save(newCompany);
    return newCompany;
  }

  async update(id: number, company: UpdateCompanyDto): Promise<void> {
    await this.companyRepository.update(id, company);
    return this.companyRepository.findOneBy({ id });
  }

  async deleteCompany(id: number): Promise<void> {
    await this.companyRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id })
    .execute();
  }
}
