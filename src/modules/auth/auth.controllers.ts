import { AuthService } from "./auth.service";
import { Body, Controller, Inject, Post, HttpException } from "@nestjs/common";
import { Public } from "../../guards";
import { AuthLoginInput } from "./dto/auth-login.input";
import { Response, response, responseError } from "../../helpers";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthService
  ) {}

  @Public()
  @Post("login")
  async login(
    @Body() param: AuthLoginInput
  ): Promise<Response<{ token: string }> | HttpException> {
    try {
      return response({
        message: "login success",
        data: await this.service.doLogin(param),
      });
    } catch (error) {
      return responseError(error.message, 422);
    }
  }
}
