import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: "User's email address",
    type: String,
    example: 'johndoe@gmail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    description: "User's password",
    type: String,
    example: 'password1234',
  })
  readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'role',
    description: "User's role (admin/user)",
    type: String,
    example: 'user',
  })
  readonly role?: string;
}
