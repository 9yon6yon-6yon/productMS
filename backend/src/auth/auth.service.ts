import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password'); // Prevents bcrypt from running on null
    }

    if (!user.password) {
      throw new UnauthorizedException('User has no password set'); // Prevents bcrypt error
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password'); // Avoids leaking details
    }

    return user;
  }

  // Login function
  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
