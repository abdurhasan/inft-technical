import { Inject, Injectable, Logger } from "@nestjs/common";
import { AuthLoginInput } from "./dto/auth-login.input";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/entities";
import { ErrorMessagesEnum } from "src/types";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async doLogin(param: AuthLoginInput): Promise<{ token: string }> {
    try {
      const { password, ...user } =
        (await this.repository.findOne({
          where: { userName: param.userName },
        })) || {};

      const doesPasswordMatch: boolean = await bcrypt.compare(
        param.password,
        password
      );

      if (!doesPasswordMatch) {
        throw new Error(ErrorMessagesEnum.UNAUTHORIZED);
      }
      return {
        token: await this.jwtService.signAsync({ ...user }),
      };
    } catch (error) {
      this.logger.error(error?.message, error?.stack, "[doLogin]");
      throw error;
    }
  }
}
