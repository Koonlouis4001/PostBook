import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    readonly password: string;

    @IsString()
    @IsOptional()
    readonly refreshToken: string;

    @IsDateString()
    @IsOptional()
    readonly modified: Date;

    @IsOptional()
    readonly profile: Profile
}
