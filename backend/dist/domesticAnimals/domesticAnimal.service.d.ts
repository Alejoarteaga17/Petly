import { Repository } from 'typeorm';
import { DomesticAnimal } from './entities/domesticAnimal.entity';
import { CreateDomesticAnimalDto } from './dto/create-domesticAnimal.dto';
export declare class DomesticAnimalService {
    private domesticAnimalsRepository;
    constructor(domesticAnimalsRepository: Repository<DomesticAnimal>);
    findAll(): Promise<DomesticAnimal[]>;
    findOne(id: number): Promise<DomesticAnimal | null>;
    create(createDomesticAnimalDto: CreateDomesticAnimalDto): Promise<DomesticAnimal>;
    update(id: number, updateDomesticAnimalDto: CreateDomesticAnimalDto): Promise<DomesticAnimal | null>;
    remove(id: number): Promise<boolean>;
}
