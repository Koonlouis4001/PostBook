import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
}
