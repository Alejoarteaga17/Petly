import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DomesticAnimalsModule } from './petly/domesticAnimal.module'; 
 
@Module({ 
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'sqlite', 
      database: 'database.sqlite', 
      autoLoadEntities: true, 
      synchronize: true, 
    }), 
    DomesticAnimalsModule,
  ], 

}) 
export class AppModule {} 