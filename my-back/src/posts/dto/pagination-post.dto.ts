import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class PaginationPostDto {
    @IsNumber()
    @IsNotEmpty()
    readonly page?: number;

    @IsNumber()
    @IsNotEmpty()
    readonly row?: number;
}
