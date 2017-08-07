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
var commodity_table_1 = require("./commodity-table");
var commodity_table_value_1 = require("./commodity-table-value");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var CommodityTableStoreService = (function () {
    function CommodityTableStoreService(_http) {
        this._http = _http;
        this._store = new Array();
        this.BASE_URL = 'api/commoditytables';
    }
    CommodityTableStoreService.prototype.getAll = function (disciplineCode, groupCode, partCode) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/" + disciplineCode + "/" + groupCode + "/" + partCode)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new commodity_table_1.CommodityTable(res[index].name, res[index].description, res[index].values.map(function (v) { return new commodity_table_value_1.CommodityTableValue(v.code, v.description); })));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    return CommodityTableStoreService;
}());
CommodityTableStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommodityTableStoreService);
exports.CommodityTableStoreService = CommodityTableStoreService;
//# sourceMappingURL=commodity-table-store.service.js.map