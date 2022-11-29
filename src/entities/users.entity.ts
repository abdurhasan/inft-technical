import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "full_name" })
  fullName: string;

  @Column({ name: "username" })
  userName: string;

  @Column({ name: "password" })
  password: string;

  // jwt token in Authorization Header
  // token?: string;
}
