import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

class AuthDtoCreate {
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  public password: string;
  @IsNotEmpty()
  public username: string;
}
class AuthDtoLogin {
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  public password: string;
}
export { AuthDtoCreate, AuthDtoLogin };
