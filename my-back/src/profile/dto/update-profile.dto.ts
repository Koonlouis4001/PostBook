import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    readonly profileName: string;

    @IsString()
    @IsOptional()
    readonly profileStatus: string;

    @IsDateString()
    @IsOptional()
    readonly modified: Date;
}
