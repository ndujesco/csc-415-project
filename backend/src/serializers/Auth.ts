
import { IsEmail, Length } from "class-validator";

class AuthDTO {
  @IsEmail()
  email!: string;

  @Length(5, 20)
  password!: string;
}



export { AuthDTO };