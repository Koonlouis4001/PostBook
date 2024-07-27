import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignUpAuthenDto {
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
