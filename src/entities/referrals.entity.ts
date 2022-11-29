import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity({ name: "referrals" })
export class Referral {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "code" })
  referralCode: string;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "type" })
  type: string;

  @Column({ name: "created_by", type: "uuid" })
  createdBy: User;
}
