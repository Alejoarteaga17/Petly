import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DomesticAnimal } from '../domesticAnimals/entities/domesticAnimal.entity';
import { Category } from '../categories/entities/category.entity';
import { Review } from '../domesticAnimals/entities/review.entity';
import { User } from '../users/entities/user.entity';
import { faker } from '@faker-js/faker';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'backend/database.sqlite',
  entities: [DomesticAnimal, Category, Review, User],
  synchronize: true,
});

const categoriesSeed = [
  { species: 'Dog', image: 'https://placehold.co/300x200?text=Dog' },
  { species: 'Cat', image: 'https://placehold.co/300x200?text=Cat' },
  { species: 'Bird', image: 'https://placehold.co/300x200?text=Bird' },
  { species: 'Rodent', image: 'https://placehold.co/300x200?text=Rodent' },
  { species: 'Fish', image: 'https://placehold.co/300x200?text=Fish' },
  { species: 'Reptile', image: 'https://placehold.co/300x200?text=Reptile' },
];

const breedsByCategory: Record<string, string[]> = {
  Dog: ['Labrador', 'Bulldog', 'Poodle', 'Beagle', 'Husky'],
  Cat: ['Persian', 'Siamese', 'Maine Coon', 'Bengal'],
  Bird: ['Parrot', 'Canary', 'Cockatiel'],
  Rodent: ['Hamster', 'Guinea Pig', 'Chinchilla'],
  Fish: ['Goldfish', 'Betta', 'Guppy'],
  Reptile: ['Iguana', 'Gecko', 'Turtle'],
};

function generateAnimal(category: Category): DomesticAnimal {
  const animal = new DomesticAnimal();

  const breedList = breedsByCategory[category.species];
  const breed = faker.helpers.arrayElement(breedList);

  animal.breed = breed;
  animal.category = category;

  animal.description = faker.lorem.paragraph();
  animal.lifeExpectancy = `${faker.number.int({ min: 2, max: 20 })} years`;
  animal.weight = `${faker.number.int({ min: 1, max: 40 })} kg`;
  animal.height = `${faker.number.int({ min: 10, max: 100 })} cm`;
  animal.behaviours = faker.lorem.sentence();
  animal.commonDisease = faker.lorem.words(3);
  animal.countryOrigin = faker.location.country();
  animal.history = faker.lorem.paragraphs(2);
  animal.image = `https://placehold.co/600x400?text=${breed}`;

  return animal;
}

async function seed() {
  await AppDataSource.initialize();

  const categoryRepo = AppDataSource.getRepository(Category);
  const animalRepo = AppDataSource.getRepository(DomesticAnimal);

  console.log('🌱 Seeding categories...');

  const categories: Category[] = [];

  for (const cat of categoriesSeed) {
    let existing = await categoryRepo.findOne({
      where: { species: cat.species },
    });

    if (!existing) {
      const newCategory = categoryRepo.create(cat);
      existing = await categoryRepo.save(newCategory);
      console.log(`✅ Created category: ${cat.species}`);
    } else {
      console.log(`↩️ Category exists: ${cat.species}`);
    }

    categories.push(existing);
  }

  console.log('🌱 Seeding animals...');

  const animals: DomesticAnimal[] = [];

  for (let i = 0; i < 50; i++) {
    const category = categories[i % categories.length];
    animals.push(generateAnimal(category));
  }

  await animalRepo.save(animals);

  console.log('✅ 50 animals inserted WITHOUT affecting users');

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error:', err);
});