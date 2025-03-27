import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/app/entities';
import { TokenService } from '../token/token.service';
import { RegisterUserDto } from './dto';
import { ERole } from 'src/app/jwt-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async register(user: RegisterUserDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userService.create({
      name: user.name,
      email: user.email,
      password: hashedPassword
    });

    return newUser;
  }

  async login(user: User, companyId: number, role: ERole): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, companyId: companyId, role: role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.tokenService.saveToken(accessToken, refreshToken, user);

    return {accessToken, refreshToken};
  }

  async refreshToken(oldAccessToken: string, companyId: number, role: ERole): Promise<string> {
    const tokenEntity = await this.tokenService.findByAccessToken(oldAccessToken);
    if (!tokenEntity || !tokenEntity.is_valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      const payload = this.jwtService.verify(oldAccessToken, { secret: 'sdfsdf' });
      const user = await this.userService.findOneById(payload.sub);

      if (!user) throw new UnauthorizedException('Invalid refresh token');

      const newAccessToken = this.jwtService.sign({ sub: user.id, companyId: companyId, role: role }, { expiresIn: '15m' });
      await this.tokenService.invalidateToken(oldAccessToken);
      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(token: string) {
    await this.tokenService.invalidateToken(token);
  }
  
  generateAccessToken(userId: number, companyId: number, role: ERole) {
    const payload = { sub: userId, companyId: companyId, role: role };
    return this.jwtService.sign(payload);
  }
}