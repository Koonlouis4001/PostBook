import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthenDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
