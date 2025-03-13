import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole, Users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  // Create new user
  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole = UserRole.USER,
  ): Promise<Users> {
    const user = new Users(createUserDto.email, createUserDto.password);
    user.role = role; // Assign role before saving
    await user.hashPassword(); // Ensure password is hashed before saving
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(
        `Error Saving User Data with error : ${error}`,
      );
    }
  }
  // Find a user by email
  async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException(`User with email: ${email} was not found`);
    return user;
  }

  // Get all users
  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }
}
