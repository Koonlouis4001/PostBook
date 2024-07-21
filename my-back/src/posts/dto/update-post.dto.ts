import { IsDate, IsInt, IsNotEmpty, IsString, isString } from "class-validator";

export class UpdatePostDto {
    @IsString()
    title?: string;

    @IsInt()
    likes?: number;

    @IsDate()
    modified?: Date;
}
