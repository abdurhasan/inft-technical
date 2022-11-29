import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Referral, User } from "src/entities";
import { ErrorMessagesEnum } from "src/types";

@Injectable()
export class ReferralService {
  private readonly logger = new Logger(ReferralService.name);

  constructor(
    @InjectRepository(Referral)
    private readonly repository: Repository<Referral>
  ) {}
}
