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
var commodity_table_value_1 = require("./commodity-table-value");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var CommodityTableValueStoreService = (function () {
    function CommodityTableValueStoreService(_http) {
        this._http = _http;
        this._store = new Array();
        this.BASE_URL = 'api/commoditytablevalues';
    }
    CommodityTableValueStoreService.prototype.getAll = function (disciplineCode, groupCode, partCode, tableName) {
        var _resultArray = new Array();
        var resultArray;
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/" + disciplineCode + "/" + groupCode + "/" + partCode + "/" + tableName)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            resultArray = res.map(function (v) { return new commodity_table_value_1.CommodityTableValue(v.code, v.description); });
            /*
            var resultArray = new Array<CommodityTableValue>();
            for(var index = 0; index < res.length; index += 1)
            {
              resultArray.push(new CommodityTableValue(res[index].name, res[index].description));
            }
            */
            result.next(resultArray);
        });
        return result.asObservable();
    };
    return CommodityTableValueStoreService;
}());
CommodityTableValueStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommodityTableValueStoreService);
exports.CommodityTableValueStoreService = CommodityTableValueStoreService;
//# sourceMappingURL=commodity-table-value-store.service.js.map