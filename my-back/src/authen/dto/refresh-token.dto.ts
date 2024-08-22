import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string;

    @IsDateString()
    @IsNotEmpty()
    expireAt: Date;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
