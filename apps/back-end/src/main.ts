import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
