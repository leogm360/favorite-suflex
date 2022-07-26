import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(port);
}
bootstrap();
