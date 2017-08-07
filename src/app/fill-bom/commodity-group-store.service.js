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
var http_1 = require("@angular/http");
var commodity_group_1 = require("./commodity-group");
var Subject_1 = require("rxjs/Subject");
var CommodityGroupStoreService = (function () {
    function CommodityGroupStoreService(_http) {
        this._http = _http;
        this.BASE_URL = 'api/commoditygroups';
    }
    CommodityGroupStoreService.prototype.getAll = function (disciplineId) {
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/" + disciplineId)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new commodity_group_1.CommodityGroup(res[index].id, res[index].code, res[index].description));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    return CommodityGroupStoreService;
}());
CommodityGroupStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommodityGroupStoreService);
exports.CommodityGroupStoreService = CommodityGroupStoreService;
//# sourceMappingURL=commodity-group-store.service.js.map