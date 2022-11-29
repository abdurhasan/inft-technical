import { ReferralController } from "./referral.controllers";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Referral, User } from "../../entities";
import { ReferralService } from "./referral.service";

@Module({
  imports: [TypeOrmModule.forFeature([Referral])],
  providers: [ReferralService],
  controllers: [ReferralController],
})
export class ReferralModule {}
