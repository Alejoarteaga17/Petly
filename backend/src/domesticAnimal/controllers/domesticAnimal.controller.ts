import { Controller, Get, Param, Post, Body } from '@nestjs/common'; 
import { DomesticAnimalService } from '../services/domesticAnimal.service'; 
import { DomesticAnimal } from '../entities/domesticAnimal.entity'; 
import { CreateDomesticAnimalDto } from '../dto/create-domesticAnimal.dto'; 
 
@Controller('domestic-animals') 
export class DomesticAnimalsController { 
  constructor(private readonly domesticAnimalService: DomesticAnimalService) {} 
 
  @Get() 
  findAll(): Promise<DomesticAnimal[]> { 
    return this.domesticAnimalService.findAll(); 
  } 
 
  @Get(':id') 
  findOne(@Param('id') id: string): Promise<DomesticAnimal | null> { 
    return this.domesticAnimalService.findOne(Number(id)); 
  } 
 
  @Post() 
  create(@Body() createDomesticAnimalDto: CreateDomesticAnimalDto) : Promise<DomesticAnimal> { 
    return this.domesticAnimalService.create(createDomesticAnimalDto); 
  } 
} 