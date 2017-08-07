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
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var material_store_service_1 = require("./material-store.service");
var MaterialService = (function () {
    function MaterialService(_storeService) {
        this._storeService = _storeService;
        this._materials = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.materials = this._materials.asObservable();
        this._totalItems = new BehaviorSubject_1.BehaviorSubject(0);
        this.totalItems = this._totalItems.asObservable();
    }
    MaterialService.prototype.getSingle = function (materialId, partId) {
        var _this = this;
        this._storeService.getSingle(materialId, partId).subscribe(function (materials) { return _this._materials.next(materials); });
    };
    MaterialService.prototype.getAll = function (partId, filter, pageNumber, pageSize) {
        var _this = this;
        this._storeService.getAll(partId, filter, pageNumber, pageSize).subscribe(function (materials) { return _this._materials.next(materials); });
    };
    MaterialService.prototype.getAllCount = function (partId, filter) {
        var _this = this;
        this._storeService.getAllCount(partId, filter).subscribe(function (totalItems) { return _this._totalItems.next(totalItems); });
    };
    MaterialService.prototype.getByCommodityCode = function (disciplineId, commodityCode) {
        var _this = this;
        this._storeService.getByCommodityCode(disciplineId, commodityCode).subscribe(function (materials) { return _this._materials.next(materials); });
    };
    MaterialService.prototype.getByCommodityCodeAndPart = function (disciplineId, partId, commodityCode) {
        var _this = this;
        this._storeService.getByCommodityCodeAndPart(disciplineId, partId, commodityCode).subscribe(function (materials) { return _this._materials.next(materials); });
    };
    MaterialService.prototype.clear = function () {
        this._materials.next(new Array());
    };
    return MaterialService;
}());
MaterialService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_store_service_1.MaterialStoreService])
], MaterialService);
exports.MaterialService = MaterialService;
//# sourceMappingURL=material.service.js.map