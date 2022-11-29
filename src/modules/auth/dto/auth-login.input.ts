import { IsNotEmpty } from "class-validator";

export class AuthLoginInput {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  password: string;
}
