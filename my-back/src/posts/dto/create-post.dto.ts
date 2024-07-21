import { IsDate, IsInt, IsNotEmpty, IsString, isString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    created: Date;

    @IsDate()
    @IsNotEmpty()
    modified: Date;

    @IsInt()
    @IsNotEmpty()
    likes: number;
}
