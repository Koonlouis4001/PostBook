import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
