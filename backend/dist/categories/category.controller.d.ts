import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category | null>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(id: string, updateCategoryDto: CreateCategoryDto): Promise<Category | null>;
    remove(id: string): Promise<boolean>;
}
