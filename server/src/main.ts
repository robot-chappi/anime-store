import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({credentials: true, origin: 'http://localhost:3001'})
  await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
}
bootstrap();
