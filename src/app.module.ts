import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { readFileSync } from "fs";
import { join } from "path";
import { APP_GUARD } from "@nestjs/core";
import { InftGuard } from "./guards/inft.guard";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ReferralModule } from "./modules/referral/referral.module";

@Module({
  imports: [
    ReferralModule,
    AuthModule,
    ConfigModule,
    DatabaseModule,
    {
      ...JwtModule.register({
        publicKey: readFileSync(join(process.cwd(), "public.key")),
        privateKey: readFileSync(join(process.cwd(), "private.key")),
        signOptions: {
          expiresIn: "7d",
          algorithm: "RS256",
        },
      }),
      global: true,
    },
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: InftGuard,
    },
  ],
})
export class AppModule {}
