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
var Subject_1 = require("rxjs/Subject");
var attribute_1 = require("./attribute");
var AttributeStoreService = (function () {
    function AttributeStoreService(_http) {
        this._http = _http;
        this.BASE_URL = 'api/attributes';
        this._store = new Array();
    }
    AttributeStoreService.prototype.getAll = function (projDisciplineId) {
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this._http
            .get(this.BASE_URL + "/" + projDisciplineId, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { result.next(res.map(function (a) { return new attribute_1.Attribute(a.id, a.code, a.description, a.mandatory, a.maxlength, a.spmatId, a.forcedMandatory, a.disabled); })); });
        return result.asObservable();
    };
    return AttributeStoreService;
}());
AttributeStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AttributeStoreService);
exports.AttributeStoreService = AttributeStoreService;
//# sourceMappingURL=attribute-store.service.js.map