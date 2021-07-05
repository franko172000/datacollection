import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { inputTypes } from '../enum';

export const getStringTypes = (): string => {
  const types = Object.entries(inputTypes);
  const stringTypes = [];
  types.forEach(element => {
    const [key, val] = element;
    stringTypes.push(val);
  });
  return stringTypes.join(', ');
};

export class FormDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  pageCount: number;
}

export class FormIdDTO {
  @IsNumber(null, {
    message: 'Please enter valid id',
  })
  id: number;
}

export class FormElementsDTO {
  @IsNumber()
  formId: number;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(inputTypes, {
    message: `Form type must be anyone of ${getStringTypes()}`,
  })
  type: string;

  @IsBoolean()
  isRequired: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  placeHolder: string;

  @ValidateIf(val => val.isRequired === true)
  @IsString()
  @IsNotEmpty()
  validationMsg: string;

  @ValidateIf(val => val.type === inputTypes.select)
  @IsArray()
  @ArrayNotEmpty()
  options: string[];

  @ValidateIf(val => val.type === inputTypes.datetime || val.type === inputTypes.date || val.type === inputTypes.time)
  @IsObject()
  @IsNotEmpty()
  otherProperties: any;

  @IsNumber()
  pageNo: number;

  @IsNumber()
  sortNo: number;
}
