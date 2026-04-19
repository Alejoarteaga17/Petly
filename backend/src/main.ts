import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cambie el puerto 5173 para que coincida con el puerto del frontend, y así evitar problemas de CORS
  app.enableCors({
    origin: [/^http:\/\/localhost:\d+$/],
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
