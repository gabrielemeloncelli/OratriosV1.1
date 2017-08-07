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
var node_type_1 = require("./node-type");
var NodeTypeService = (function () {
    function NodeTypeService(http) {
        this.http = http;
        this.BASE_URL = 'api/projectdiscipline/nodeTypes';
    }
    NodeTypeService.prototype.getNodeTypes = function (projectId) {
        var _this = this;
        var result = new Subject_1.Subject();
        this.http.get(this.BASE_URL + "/" + projectId.toString())
            .map(function (res) { return res.json(); })
            .subscribe(function (nt) { return result.next(_this.getNodeTypesFromResponse(nt)); });
        return result.asObservable();
    };
    NodeTypeService.prototype.getNodeTypesFromResponse = function (jsonNodeTypes) {
        return jsonNodeTypes.map(function (nt) { return new node_type_1.NodeType(nt.code, nt.shortDescription, nt.description); });
    };
    return NodeTypeService;
}());
NodeTypeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NodeTypeService);
exports.NodeTypeService = NodeTypeService;
//# sourceMappingURL=node-type.service.js.map