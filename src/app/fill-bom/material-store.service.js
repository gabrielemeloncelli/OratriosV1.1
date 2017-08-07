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
var material_1 = require("./material");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var MaterialStoreService = (function () {
    function MaterialStoreService(_http) {
        this._http = _http;
        this.BASE_URL = 'api/materials';
        this._store = new Array();
    }
    MaterialStoreService.prototype.getSingle = function (materialId, partId) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/" + materialId.toString() + '/' + partId)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new material_1.Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId, res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    MaterialStoreService.prototype.getAll = function (partId, filter, pageNumber, pageSize) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this._http
            .post(this.BASE_URL + "/" + partId + "/page/" + pageNumber + "/" + pageSize, filter.tableFilters, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new material_1.Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId, res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    MaterialStoreService.prototype.getAllCount = function (partId, filter) {
        var result = new Subject_1.Subject();
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this._http
            .post(this.BASE_URL + "/" + partId + "/count", filter.tableFilters, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            return result.next(res);
        });
        return result.asObservable();
    };
    MaterialStoreService.prototype.getByCommodityCode = function (disciplineId, commodityCode) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/commodityCode/" + disciplineId.toString() + '/' + commodityCode)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new material_1.Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId, res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    MaterialStoreService.prototype.getByCommodityCodeAndPart = function (disciplineId, partId, commodityCode) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/" + partId.toString() + "/commodityCode/" + disciplineId.toString() + '/' + commodityCode)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            var resultArray = new Array();
            for (var index = 0; index < res.length; index += 1) {
                resultArray.push(new material_1.Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId, res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
            }
            result.next(resultArray);
        });
        return result.asObservable();
    };
    return MaterialStoreService;
}());
MaterialStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MaterialStoreService);
exports.MaterialStoreService = MaterialStoreService;
//# sourceMappingURL=material-store.service.js.map