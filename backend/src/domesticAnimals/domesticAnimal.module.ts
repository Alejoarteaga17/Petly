// Author: Alejandra Suarez & Alejandro Arteaga
import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DomesticAnimal } from './entities/domesticAnimal.entity'; 
import { Review } from './entities/review.entity'; 
import { DomesticAnimalsController } from './domesticAnimal.controller'; 
import { DomesticAnimalService } from './domesticAnimal.service'; 
import { ReviewsController } from './reviews.controller'; 
import { ReviewsService } from './reviews.service';
 
@Module({ 
  imports: [TypeOrmModule.forFeature([DomesticAnimal, Review])], 
  controllers: [DomesticAnimalsController, ReviewsController], 
  providers: [DomesticAnimalService, ReviewsService], 
}) 
export class DomesticAnimalsModule {} 