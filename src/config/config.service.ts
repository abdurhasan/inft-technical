import { from } from "env-var";
import { config } from "dotenv";

config({ path: ".env" });

export class ConfigService {
  private env = from(process.env);
  public readonly APP_PORT: number = this.env
    .get("APP_PORT")
    .required()
    .asPortNumber();

  public readonly DB_HOST: string = this.env
    .get("DB_HOST")
    .required()
    .asString();

  public readonly DB_PORT: number = this.env
    .get("DB_PORT")
    .required()
    .asPortNumber();

  public readonly DB_USER: string = this.env
    .get("DB_USER")
    .required()
    .asString();

  public readonly DB_PASSWORD: string = this.env
    .get("DB_PASSWORD")
    .required()
    .asString();

  public readonly DB_NAME: string = this.env
    .get("DB_NAME")
    .required()
    .asString();
}
