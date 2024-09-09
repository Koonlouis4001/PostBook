import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    readonly title: string;
}
