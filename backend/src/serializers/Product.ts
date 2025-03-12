import 'reflect-metadata';
import { IsInt, IsString, Min, Length } from "class-validator";

class CreateProductDTO {
    @IsString()
    @Length(3, 50)
    name!: string;

    @IsInt()
    @Min(1)
    price!: number;

    @IsString()
    status!: string;

    @IsInt()
    @Min(0)
    quantity!: number;

    @IsString()
    @Length(3, 50)
    category!: string;
}

class UpdateProductDTO extends CreateProductDTO {}

export { CreateProductDTO, UpdateProductDTO };
