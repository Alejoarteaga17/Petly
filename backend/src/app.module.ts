import { Module } from '@nestjs/common'; 
import { HomeModule } from './home/home.module'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DomesticAnimalsModule } from './domesticAnimal/domesticAnimal.module'; 
 
@Module({ 
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'sqlite', 
      database: 'database.sqlite', 
      autoLoadEntities: true, 
      synchronize: true, 
    }), 
    HomeModule, 
    DomesticAnimalsModule,
  ], 

}) 
export class AppModule {} 