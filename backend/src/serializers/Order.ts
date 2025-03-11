import 'reflect-metadata'
import { IsInt, IsString, IsArray, Min, Length, IsOptional, IsEmail } from "class-validator";

class CreateOrderDTO {
  @IsInt()
  @Min(1)
  amount!: number;

  @IsString()
  @Length(5, 100)
  address!: string;

  @IsArray()
  order!: string[];

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
