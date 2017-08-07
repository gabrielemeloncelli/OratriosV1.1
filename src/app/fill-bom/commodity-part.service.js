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
var commodity_part_store_service_1 = require("./commodity-part-store.service");
var CommodityPartService = (function () {
    function CommodityPartService(_storeService) {
        this._storeService = _storeService;
        this._parts = new BehaviorSubject_1.BehaviorSubject(new Array());
        this.parts = this._parts.asObservable();
        this.nodeId = 0;
    }
    CommodityPartService.prototype.getAll = function (groupId) {
        var _this = this;
        this._storeService.getAll(groupId).subscribe(function (parts) { return _this._parts.next(parts); });
    };
    return CommodityPartService;
}());
CommodityPartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [commodity_part_store_service_1.CommodityPartStoreService])
], CommodityPartService);
exports.CommodityPartService = CommodityPartService;
//# sourceMappingURL=commodity-part.service.js.map