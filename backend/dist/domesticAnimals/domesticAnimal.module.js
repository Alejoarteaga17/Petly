"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomesticAnimalsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const domesticAnimal_entity_1 = require("./entities/domesticAnimal.entity");
const review_entity_1 = require("./entities/review.entity");
const domesticAnimal_controller_1 = require("./domesticAnimal.controller");
const domesticAnimal_service_1 = require("./domesticAnimal.service");
const reviews_controller_1 = require("./reviews.controller");
const reviews_service_1 = require("./reviews.service");
let DomesticAnimalsModule = class DomesticAnimalsModule {
};
exports.DomesticAnimalsModule = DomesticAnimalsModule;
exports.DomesticAnimalsModule = DomesticAnimalsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([domesticAnimal_entity_1.DomesticAnimal, review_entity_1.Review])],
        controllers: [domesticAnimal_controller_1.DomesticAnimalsController, reviews_controller_1.ReviewsController],
        providers: [domesticAnimal_service_1.DomesticAnimalService, reviews_service_1.ReviewsService],
    })
], DomesticAnimalsModule);
//# sourceMappingURL=domesticAnimal.module.js.map