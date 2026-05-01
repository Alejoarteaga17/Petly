// Author: Alejandro Arteaga
// External imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
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
  
  findByDomesticAnimalId(domesticAnimalId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { domesticAnimal: { id: domesticAnimalId } },
      relations: ['user'],
    });
  }
  
  findByUserId(userId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'domesticAnimal'],
    });
  }

  findAllOrdered(orderBy: 'publication' | 'rating'): Promise<Review[]> {
    return this.reviewsRepository.find({
      relations: ['user', 'domesticAnimal'],
      order: orderBy === 'rating' ? { rating: 'DESC' } : { createdAt: 'DESC' },
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
