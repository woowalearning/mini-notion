import { NestFactory } from '@nestjs/core';
import { OAuthModule } from './oauth/oauth.module';

async function bootstrap() {
  const app = await NestFactory.create(OAuthModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
