import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsDateString()
    @IsNotEmpty()
    created: Date;

    @IsDateString()
    @IsNotEmpty()
    modified: Date;
}
