import { IsByteLength, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpAuthenDto {
    @IsString()
    @IsNotEmpty({ message: 'Username must not be empty.' })
    @MinLength(8, { message: 'Username must be at least 8 characters.' })
    @MaxLength(100, { message: 'Username must be no more than 72 characters.' })
    @IsByteLength(8,72, { message: 'Username must be between 8 and 72 bytes long.' })
    userName: string;

    @IsString()
    @IsNotEmpty({ message: 'Password must not be empty.' })
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    @MaxLength(100, { message: 'Password must be no more than 72 characters.' })
    @IsByteLength(8,72, { message: 'Password must be between 8 and 72 bytes long.' })
    password: string;
}
