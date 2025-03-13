import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/entity/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  // Register a user (default role: USER)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto, UserRole.USER);
  }

  // Register an admin (restricted usage)
  @Post('register/admin')
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto, UserRole.ADMIN);
  }

  // Login and return JWT token
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
