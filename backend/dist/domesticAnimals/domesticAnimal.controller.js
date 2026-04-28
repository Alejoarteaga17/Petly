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
exports.DomesticAnimalsController = void 0;
const common_1 = require("@nestjs/common");
const domesticAnimal_service_1 = require("./domesticAnimal.service");
const create_domesticAnimal_dto_1 = require("./dto/create-domesticAnimal.dto");
let DomesticAnimalsController = class DomesticAnimalsController {
    domesticAnimalService;
    constructor(domesticAnimalService) {
        this.domesticAnimalService = domesticAnimalService;
    }
    findAll() {
        return this.domesticAnimalService.findAll();
    }
    findOne(id) {
        return this.domesticAnimalService.findOne(Number(id));
    }
    create(createDomesticAnimalDto) {
        return this.domesticAnimalService.create(createDomesticAnimalDto);
    }
    update(id, updateDomesticAnimalDto) {
        return this.domesticAnimalService.update(Number(id), updateDomesticAnimalDto);
    }
    remove(id) {
        return this.domesticAnimalService.remove(Number(id));
    }
};
exports.DomesticAnimalsController = DomesticAnimalsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DomesticAnimalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomesticAnimalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_domesticAnimal_dto_1.CreateDomesticAnimalDto]),
    __metadata("design:returntype", Promise)
], DomesticAnimalsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_domesticAnimal_dto_1.CreateDomesticAnimalDto]),
    __metadata("design:returntype", Promise)
], DomesticAnimalsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomesticAnimalsController.prototype, "remove", null);
exports.DomesticAnimalsController = DomesticAnimalsController = __decorate([
    (0, common_1.Controller)('domestic-animals'),
    __metadata("design:paramtypes", [domesticAnimal_service_1.DomesticAnimalService])
], DomesticAnimalsController);
//# sourceMappingURL=domesticAnimal.controller.js.map