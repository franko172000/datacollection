import { IsEmail, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

/**
 * Passord validation structure
 * 1. The string must contain at least 1 lowercase alphabetical character
 * 2. The string must contain at least 1 uppercase alphabetical character
 * 3. The string must contain at least 1 numeric character
 * 4. The string must contain at least one special character
 * 5. The string must be eight characters or longer
 */
const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const pwdMessage =
  'Invalid password. Password must contain atleast 1 special character, \n 1 lowercase alphabetical character, \n 1 uppercase alphabetical character, \n 1 numeric character \n and must be eight characters or longer';

export class UserRegisterDTO {
  @MinLength(2, {
    message: 'First name is missing ',
  })
  firstName: string;

  @MinLength(2, {
    message: 'last name is missing ',
  })
  lastName: string;

  @IsOptional()
  companyName: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegEx, {
    message: pwdMessage,
  })
  password: string;
}

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class OtpDTO {
  @IsString()
  token: string;

  @IsNumber()
  code: number;
}

export class ResetPasswordDTO {
  @Matches(passwordRegEx, {
    message: pwdMessage,
  })
  password: string;

  @IsString()
  token: string;

  @IsNumber()
  code: number;
}

export class updatePasswordDTO {
  @Matches(passwordRegEx, {
    message: pwdMessage,
  })
  password: string;
}

export class tokenDTO {
  @IsEmail()
  email: string;
}
export class forgotPasswordDTO {
  @IsEmail()
  email: string;
}
