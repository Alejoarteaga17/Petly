// Author: Alejandro Arteaga

// External imports
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Internal imports
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}
    
    findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: ['domesticAnimals'],
        });
    }

    findOne(id: number): Promise<Category | null> {
        return this.categoryRepository.findOne({
            where: { id },
            relations: ['domesticAnimals'],
        });
    }

    create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    async update(id: number, updateCategoryDto: CreateCategoryDto): Promise<Category | null> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            return null;
        }

        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.categoryRepository.delete(id);
        return Boolean(result.affected);
    }
    
}