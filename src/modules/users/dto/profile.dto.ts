import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  telephone: string;

  @IsString()
  companyName: string;

  @IsNumber()
  @IsOptional()
  industry: number;
}
