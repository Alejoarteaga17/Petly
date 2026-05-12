import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | null>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(id: number, updateCategoryDto: CreateCategoryDto): Promise<Category | null>;
    remove(id: number): Promise<boolean>;
}
