import {
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  created: Date;

  @IsDate()
  @IsNotEmpty()
  modified: Date;
}
