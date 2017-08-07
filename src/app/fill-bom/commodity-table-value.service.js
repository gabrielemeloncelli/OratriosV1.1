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
var commodity_table_value_store_service_1 = require("./commodity-table-value-store.service");
var CommodityTableValueService = (function () {
    function CommodityTableValueService(_storeService) {
        this._storeService = _storeService;
        this._values = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.values = this._values.asObservable();
    }
    CommodityTableValueService.prototype.getAll = function (disciplineCode, groupCode, partCode, tableName) {
        var _this = this;
        this._storeService.getAll(disciplineCode, groupCode, partCode, tableName).subscribe(function (values) { return _this._values.next(values); });
    };
    return CommodityTableValueService;
}());
CommodityTableValueService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [commodity_table_value_store_service_1.CommodityTableValueStoreService])
], CommodityTableValueService);
exports.CommodityTableValueService = CommodityTableValueService;
//# sourceMappingURL=commodity-table-value.service.js.map