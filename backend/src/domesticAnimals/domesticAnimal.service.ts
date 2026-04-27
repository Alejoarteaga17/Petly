// Author: Alejandra Suarez & Alejandro Arteaga
// External imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { DomesticAnimal } from './entities/domesticAnimal.entity';
import { CreateDomesticAnimalDto } from './dto/create-domesticAnimal.dto';

@Injectable()
export class DomesticAnimalService {
  constructor(
    @InjectRepository(DomesticAnimal)
    private domesticAnimalsRepository: Repository<DomesticAnimal>,
  ) {}

  findAll(): Promise<DomesticAnimal[]> {
    return this.domesticAnimalsRepository.find();
  }

  findOne(id: number): Promise<DomesticAnimal | null> {
    return this.domesticAnimalsRepository.findOneBy({ id });
  }

  create(
    createDomesticAnimalDto: CreateDomesticAnimalDto,
  ): Promise<DomesticAnimal> {
    const domesticAnimal = this.domesticAnimalsRepository.create(
      createDomesticAnimalDto,
    );
    return this.domesticAnimalsRepository.save(domesticAnimal);
  }

  async update(
    id: number,
    updateDomesticAnimalDto: CreateDomesticAnimalDto,
  ): Promise<DomesticAnimal | null> {
    const domesticAnimal = await this.domesticAnimalsRepository.findOneBy({
      id,
    });
    if (!domesticAnimal) {
      return null;
    }

    Object.assign(domesticAnimal, updateDomesticAnimalDto);
    return this.domesticAnimalsRepository.save(domesticAnimal);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.domesticAnimalsRepository.delete(id);
    return Boolean(result.affected);
  }
}
