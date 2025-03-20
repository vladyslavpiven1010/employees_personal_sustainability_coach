export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  deleted_at?: Date;
}