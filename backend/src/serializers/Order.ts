import 'reflect-metadata';
import { IsInt, IsArray, Min, IsString, Length, IsOptional, IsEmail } from "class-validator";
import { Product } from '@prisma/client';

class CreateOrderDTO {
    @IsInt()
    @Min(1)
    amount!: number;

    @IsString()
    @Length(5, 100)
    address!: string;

    @IsArray()
    @IsInt({ each: true }) // Ensure all values are numbers
    productIds!: number[] 

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(3, 20)
    status?: string;
}

class UpdateOrderDTO extends CreateOrderDTO {
    @IsEmail()
    email!: string;
}

export { CreateOrderDTO, UpdateOrderDTO };
