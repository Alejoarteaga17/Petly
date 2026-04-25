import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserModule } from './users/user.module'; 
import { AuthModule } from './auth/auth.module'; 
import { DomesticAnimalsModule } from './domesticAnimals/domesticAnimal.module'; 
 
@Module({ 
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'sqlite', 
      database: 'database.sqlite', 
      autoLoadEntities: true, 
      synchronize: true, 
    }), 
    UserModule,
    AuthModule,
    DomesticAnimalsModule,
  ], 
}) 
export class AppModule {} 