// Author: Alejandra Suarez & Alejandro Arteaga
// External imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { DomesticAnimal } from './entities/domesticAnimal.entity';
import { CreateDomesticAnimalDto } from './dto/create-domesticAnimal.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class DomesticAnimalService {
  constructor(
    @InjectRepository(DomesticAnimal)
    private domesticAnimalsRepository: Repository<DomesticAnimal>,
  ) {}

  findAll(): Promise<DomesticAnimal[]> {
    return this.domesticAnimalsRepository.find({
      relations: ['category'],
    });
  }

  findOne(id: number): Promise<DomesticAnimal | null> {
    return this.domesticAnimalsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  create(
    createDomesticAnimalDto: CreateDomesticAnimalDto,
  ): Promise<DomesticAnimal> {
    const domesticAnimal = this.domesticAnimalsRepository.create({
      ...createDomesticAnimalDto,
      category: { id: createDomesticAnimalDto.categoryId } as Category,
    });
    return this.domesticAnimalsRepository.save(domesticAnimal);
  }

  async update(
    id: number,
    updateDomesticAnimalDto: CreateDomesticAnimalDto,
  ): Promise<DomesticAnimal | null> {
    const domesticAnimal = await this.domesticAnimalsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!domesticAnimal) {
      return null;
    }

    Object.assign(domesticAnimal, updateDomesticAnimalDto, {
      category: { id: updateDomesticAnimalDto.categoryId } as Category,
    });
    return this.domesticAnimalsRepository.save(domesticAnimal);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.domesticAnimalsRepository.delete(id);
    return Boolean(result.affected);
  }
}
