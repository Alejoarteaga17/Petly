"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomesticAnimalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const domesticAnimal_entity_1 = require("./entities/domesticAnimal.entity");
let DomesticAnimalService = class DomesticAnimalService {
    domesticAnimalsRepository;
    constructor(domesticAnimalsRepository) {
        this.domesticAnimalsRepository = domesticAnimalsRepository;
    }
    findAll() {
        return this.domesticAnimalsRepository.find();
    }
    findOne(id) {
        return this.domesticAnimalsRepository.findOneBy({ id });
    }
    create(createDomesticAnimalDto) {
        const domesticAnimal = this.domesticAnimalsRepository.create(createDomesticAnimalDto);
        return this.domesticAnimalsRepository.save(domesticAnimal);
    }
    async update(id, updateDomesticAnimalDto) {
        const domesticAnimal = await this.domesticAnimalsRepository.findOneBy({
            id,
        });
        if (!domesticAnimal) {
            return null;
        }
        Object.assign(domesticAnimal, updateDomesticAnimalDto);
        return this.domesticAnimalsRepository.save(domesticAnimal);
    }
    async remove(id) {
        const result = await this.domesticAnimalsRepository.delete(id);
        return Boolean(result.affected);
    }
};
exports.DomesticAnimalService = DomesticAnimalService;
exports.DomesticAnimalService = DomesticAnimalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(domesticAnimal_entity_1.DomesticAnimal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DomesticAnimalService);
//# sourceMappingURL=domesticAnimal.service.js.map