import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Profile } from "src/profile/entities/profile.entity";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsDateString()
    @IsNotEmpty()
    readonly created: Date;

    @IsDateString()
    @IsNotEmpty()
    readonly modified: Date;

    @IsNumber()
    @IsNotEmpty()
    readonly likes: number;

    @IsNumber()
    @IsNotEmpty()
    profile: number;
}
