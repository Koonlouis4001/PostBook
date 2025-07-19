import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpAuthenDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 72)
    userName: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 72)
    password: string;
}
