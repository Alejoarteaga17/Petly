import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cambie el puerto 5173 para que coincida con el puerto del frontend, y así evitar problemas de CORS
  app.enableCors({
    origin: [/^http:\/\/localhost:\d+$/],
  });
  // Aplica validacion global a todos los DTOs: elimina campos no permitidos,
  // rechaza requests con propiedades extra y transforma tipos automaticamente.
  // (La IA lo puso luego de agregar la transformacion de contraseñas)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
