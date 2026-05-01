// Author: Alejandro Arteaga

// External imports
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

// Internal imports
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";


@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Category | null> {
        return this.categoryService.findOne(Number(id));
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: CreateCategoryDto,
    ): Promise<Category | null> {
        return this.categoryService.update(Number(id), updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<boolean> {
        return this.categoryService.remove(Number(id));
    }
}