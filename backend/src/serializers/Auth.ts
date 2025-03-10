
import { IsEmail, Length } from "class-validator";

class Auth {
  @IsEmail()
  email!: string;

  @Length(5, 20)
  password!: string;
}



export { Auth };