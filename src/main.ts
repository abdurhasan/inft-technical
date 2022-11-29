import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

/* eslint-disable no-console */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });
  const env = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(env.APP_PORT);

  Logger.debug(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

/* eslint-enable no-console */
