import { Module } from '@nestjs/common'; 
import { DomesticAnimalsController } from './controllers/domesticAnimal.controller'; 
import { DomesticAnimalService } from './services/domesticAnimal.service'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DomesticAnimal } from './entities/domesticAnimal.entity'; 
import { Review } from './entities/review.entity'; 
import { ReviewsController } from './controllers/reviews.controller'; 
import { ReviewsService } from './services/reviews.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
 
@Module({ 
  imports: [
    TypeOrmModule.forFeature([DomesticAnimal, Review, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ], 
  controllers: [DomesticAnimalsController, ReviewsController, UserController], 
  providers: [DomesticAnimalService, ReviewsService, UserService], 
}) 
export class DomesticAnimalsModule {} 