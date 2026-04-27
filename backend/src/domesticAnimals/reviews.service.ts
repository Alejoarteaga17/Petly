// Author: Alejandro Arteaga
import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Review } from './entities/review.entity'; 
import { CreateReviewDto } from './dto/create-review.dto'; 
 
@Injectable() 
export class ReviewsService { 
  constructor( 
    @InjectRepository(Review) 
    private reviewsRepository: Repository<Review>, 
  ) {} 
 
  findAll(): Promise<Review[]> { 
    return this.reviewsRepository.find({ relations: ['user'] }); 
  } 
 // While using relations the systems allow us to get the full info from that table were relting to, 
 // wich allow us to show the author's name in the frontend.
  findByDomesticAnimalId(domesticAnimalId: number): Promise<Review[]> { 
    return this.reviewsRepository.find({ 
      where: { domesticAnimal: { id: domesticAnimalId } },
      relations: ['user'],
    }); 
  } 
 // While using relations the systems allow us to get the full info from that table were relting to, 
 // wich allow us to show the animal's name from the review in the frontend.
  findByUserId(userId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'domesticAnimal'],
    });
  }
 
  create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { domesticAnimalId, userId, ...rest } = createReviewDto;
    const review = this.reviewsRepository.create({
      ...rest,
      domesticAnimal: { id: domesticAnimalId },
      user: { id: userId },
    });

    return this.reviewsRepository.save(review);
  } 
} 