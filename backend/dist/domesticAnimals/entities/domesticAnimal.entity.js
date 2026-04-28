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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomesticAnimal = void 0;
const typeorm_1 = require("typeorm");
const review_entity_1 = require("./review.entity");
let DomesticAnimal = class DomesticAnimal {
    id;
    breed;
    category;
    description;
    lifeExpectancy;
    weight;
    height;
    behaviours;
    commonDisease;
    countryOrigin;
    history;
    image;
    reviews;
};
exports.DomesticAnimal = DomesticAnimal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DomesticAnimal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "lifeExpectancy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "behaviours", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "commonDisease", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "countryOrigin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "history", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DomesticAnimal.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.domesticAnimal),
    __metadata("design:type", Array)
], DomesticAnimal.prototype, "reviews", void 0);
exports.DomesticAnimal = DomesticAnimal = __decorate([
    (0, typeorm_1.Entity)()
], DomesticAnimal);
//# sourceMappingURL=domesticAnimal.entity.js.map