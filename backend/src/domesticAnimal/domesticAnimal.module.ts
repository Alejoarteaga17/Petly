import { Module } from '@nestjs/common'; 
import { DomesticAnimalsController } from './domesticAnimal.controller'; 
import { DomesticAnimalService } from './domesticAnimal.service'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DomesticAnimal } from './entities/domesticAnimal.entity'; 
import { Review } from './entities/review.entity'; 
import { ReviewsController } from './reviews.controller'; 
import { ReviewsService } from './reviews.service';
 
@Module({ 
  imports: [TypeOrmModule.forFeature([DomesticAnimal, Review])], 
  controllers: [DomesticAnimalsController, ReviewsController], 
  providers: [DomesticAnimalService, ReviewsService], 
}) 
export class DomesticAnimalsModule {} 