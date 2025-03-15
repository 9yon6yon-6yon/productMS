import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/entity/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
