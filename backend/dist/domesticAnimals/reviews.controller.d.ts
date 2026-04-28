import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(): Promise<Review[]>;
    findByDomesticAnimalId(domesticAnimalId: string): Promise<Review[]>;
    findByUserId(userId: string): Promise<Review[]>;
    create(createReviewDto: CreateReviewDto): Promise<Review>;
}
