import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    readonly title?: string;

    @IsNumber()
    @IsOptional()
    readonly likes?: number;

    @IsDateString()
    @IsOptional()
    readonly modified?: Date;
}
