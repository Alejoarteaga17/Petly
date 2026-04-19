import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Review } from '../entities/review.entity'; 
import { CreateReviewDto } from '../dto/create-review.dto'; 
 
@Injectable() 
export class ReviewsService { 
  constructor( 
    @InjectRepository(Review) 
    private reviewsRepository: Repository<Review>, 
  ) {} 
 
  findAll(): Promise<Review[]> { 
    return this.reviewsRepository.find({ relations: ['user'] }); 
  } 
 // Al usar relations tambien vamos a traer la informacion del usuario que hizo la reseña, 
 // lo que nos permite mostrar el nombre del autor en el frontend.
  findByDomesticAnimalId(domesticAnimalId: number): Promise<Review[]> { 
    return this.reviewsRepository.find({ 
      where: { domesticAnimal: { id: domesticAnimalId } },
      relations: ['user'],
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