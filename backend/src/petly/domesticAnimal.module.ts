import { Module } from '@nestjs/common'; 
import { DomesticAnimalsController } from './controllers/domesticAnimal.controller'; 
import { DomesticAnimalService } from './services/domesticAnimal.service'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DomesticAnimal } from './entities/domesticAnimal.entity'; 
import { Review } from './entities/review.entity'; 
import { ReviewsController } from './controllers/reviews.controller'; 
import { ReviewsService } from './services/reviews.service';
 
@Module({ 
  imports: [TypeOrmModule.forFeature([DomesticAnimal, Review])], 
  controllers: [DomesticAnimalsController, ReviewsController], 
  providers: [DomesticAnimalService, ReviewsService], 
}) 
export class DomesticAnimalsModule {} 