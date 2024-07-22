import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    readonly profileName: string;

    @IsString()
    @IsOptional()
    readonly profileStatus: string;

    @IsDateString()
    @IsNotEmpty()
    readonly created: Date;

    @IsDateString()
    @IsNotEmpty()
    readonly modified: Date;
}
