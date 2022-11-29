import { Controller, Inject } from "@nestjs/common";

import { ReferralService } from "./referral.service";

@Controller("referral")
export class ReferralController {
  constructor(
    @Inject(ReferralService)
    private readonly service: ReferralService
  ) {}

  // @Post('login')
  // async login(
  //   @Body() param: AuthLoginInput,
  // ): Promise<Response<{ token: string }> | HttpException> {
  //   try {
  //     return response({
  //       message: 'login success',
  //       data: await this.service.doLogin(param),
  //     });
  //   } catch (error) {
  //     return responseError(error.message, 422);
  //   }
  // }
}
