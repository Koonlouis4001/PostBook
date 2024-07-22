import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
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
