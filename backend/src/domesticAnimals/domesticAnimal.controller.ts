// Author: Alejandra Suarez
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

// Internal imports
import { DomesticAnimalService } from './domesticAnimal.service';
import { DomesticAnimal } from './entities/domesticAnimal.entity';
import { CreateDomesticAnimalDto } from './dto/create-domesticAnimal.dto';

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
  create(
    @Body() createDomesticAnimalDto: CreateDomesticAnimalDto,
  ): Promise<DomesticAnimal> {
    return this.domesticAnimalService.create(createDomesticAnimalDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDomesticAnimalDto: CreateDomesticAnimalDto,
  ): Promise<DomesticAnimal | null> {
    return this.domesticAnimalService.update(
      Number(id),
      updateDomesticAnimalDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.domesticAnimalService.remove(Number(id));
  }
}
