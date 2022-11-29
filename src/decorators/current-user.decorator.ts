import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/entities/users.entity";

export const CurrentUser = createParamDecorator<User>(
  (data: unknown, context: ExecutionContext) => {
    const ctx: any = context?.switchToHttp().getRequest();
    return (ctx?.user || ctx?.req?.user) as User;
  }
);
