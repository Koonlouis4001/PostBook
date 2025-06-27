import { IsDateString, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    readonly profileName: string;

    @IsString()
    @IsOptional()
    readonly profileStatus: string;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}
