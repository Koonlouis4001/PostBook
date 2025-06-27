import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    refreshToken: string;

    @IsOptional()
    profile: Profile
}
