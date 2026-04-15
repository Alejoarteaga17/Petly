import { Body, Controller, Get, Param, Post } from '@nestjs/common'; 
import { ReviewsService } from './reviews.service'; 
import { CreateReviewDto } from './dto/create-review.dto'; 
import { Review } from './entities/review.entity'; 
 
@Controller('reviews') 
export class ReviewsController { 
  constructor(private readonly reviewsService: ReviewsService) {} 
 
  @Get() 
  findAll(): Promise<Review[]> { 
    return this.reviewsService.findAll(); 
  } 
 
  @Get('domestic-animal/:domesticAnimalId') 
  findByDomesticAnimalId(@Param('domesticAnimalId') domesticAnimalId: string): Promise<Review[]> { 
    return this.reviewsService.findByDomesticAnimalId(Number(domesticAnimalId)); 
  } 
 
  @Post() 
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> { 
    return this.reviewsService.create(createReviewDto); 
  } 
} 