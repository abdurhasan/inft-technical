import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  CustomDecorator,
  HttpException,
  Inject,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as isEmpty from "is-empty";
import { ErrorMessagesEnum } from "src/types";
import { JwtService } from "@nestjs/jwt";

const IS_PUBLIC_KEY = "isPublic";

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class InftGuard {
  constructor(
    private reflector: Reflector,
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) {
      return true;
    }

    const req = context?.switchToHttp().getRequest();
    const token: string = req.headers?.authorization?.replace("Bearer ", "");

    try {
      if (isEmpty(token)) {
        throw new Error(ErrorMessagesEnum.NO_TOKEN);
      }

      req.user = {
        ...(await this.jwtService.verifyAsync(token)),
        token,
      };

      return true;
    } catch (err) {
      throw new HttpException(
        { message: err?.message, success: false, status: 401 },
        401
      );
    }
  }
}
