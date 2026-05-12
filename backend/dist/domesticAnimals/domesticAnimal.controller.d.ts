import { DomesticAnimalService } from './domesticAnimal.service';
import { DomesticAnimal } from './entities/domesticAnimal.entity';
import { CreateDomesticAnimalDto } from './dto/create-domesticAnimal.dto';
export declare class DomesticAnimalsController {
    private readonly domesticAnimalService;
    constructor(domesticAnimalService: DomesticAnimalService);
    findAll(): Promise<DomesticAnimal[]>;
    findOne(id: string): Promise<DomesticAnimal | null>;
    create(createDomesticAnimalDto: CreateDomesticAnimalDto): Promise<DomesticAnimal>;
    update(id: string, updateDomesticAnimalDto: CreateDomesticAnimalDto): Promise<DomesticAnimal | null>;
    remove(id: string): Promise<boolean>;
}
