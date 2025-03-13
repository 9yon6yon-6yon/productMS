import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
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
    example: 'Strongpassword',
  })
  readonly password: string;
}
