// Author : Alejandro Arteaga

//External imports
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//Internal imports
import { DomesticAnimal } from "src/domesticAnimals/entities/domesticAnimal.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    species!: string;

    @Column()
    image!: string;
    
    @OneToMany(() => DomesticAnimal, (domesticAnimal) => domesticAnimal.category)
    domesticAnimals!: DomesticAnimal[];
}