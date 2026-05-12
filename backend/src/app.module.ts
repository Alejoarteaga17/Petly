//  External imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal imports
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DomesticAnimalsModule } from './domesticAnimals/domesticAnimal.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    CategoryModule,
    DomesticAnimalsModule,
    UserModule,
  ],
})
export class AppModule {}
