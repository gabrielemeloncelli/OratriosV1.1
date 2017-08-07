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
var commodity_part_1 = require("./commodity-part");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var CommodityPartStoreService = (function () {
    function CommodityPartStoreService(_http) {
        this._http = _http;
        this._store = new Array();
        this.BASE_URL = 'api/commodityparts';
    }
    CommodityPartStoreService.prototype.getAll = function (groupId) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/" + groupId)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new commodity_part_1.CommodityPart(res[index].id, res[index].code, res[index].description, res[index].groupCode));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    return CommodityPartStoreService;
}());
CommodityPartStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommodityPartStoreService);
exports.CommodityPartStoreService = CommodityPartStoreService;
//# sourceMappingURL=commodity-part-store.service.js.map