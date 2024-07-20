import {
    IsAlphanumeric,
    isDate,
    IsDate,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;

  @IsInt()
  likes: number;
}