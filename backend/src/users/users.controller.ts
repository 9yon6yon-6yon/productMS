import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('add')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto, UserRole.USER);
  }
}
