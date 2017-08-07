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
var commodity_table_store_service_1 = require("./commodity-table-store.service");
var CommodityTableService = (function () {
    function CommodityTableService(_storeService) {
        this._storeService = _storeService;
        this._tables = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.tables = this._tables.asObservable();
    }
    CommodityTableService.prototype.getAll = function (disciplineCode, groupCode, partCode) {
        var _this = this;
        this._storeService.getAll(disciplineCode, groupCode, partCode).subscribe(function (tables) { return _this._tables.next(tables); });
    };
    return CommodityTableService;
}());
CommodityTableService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [commodity_table_store_service_1.CommodityTableStoreService])
], CommodityTableService);
exports.CommodityTableService = CommodityTableService;
//# sourceMappingURL=commodity-table.service.js.map