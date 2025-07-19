import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignInAuthenDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 72)
    userName: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 72)
    password: string;
}
