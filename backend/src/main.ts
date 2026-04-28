import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cambie el puerto 5173 para que coincida con el puerto del frontend, y así evitar problemas de CORS
  const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()); 
  app.enableCors({ 
    origin: corsOrigins?.length ? corsOrigins : ['http://localhost:5173', 'http://localhost', 'http://127.0.0.1'], 
  }); 
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
