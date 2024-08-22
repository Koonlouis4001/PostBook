import { IsNotEmpty, IsString } from "class-validator";

export class SignInAuthenDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
