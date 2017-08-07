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
var Subject_1 = require("rxjs/Subject");
var position_store_service_1 = require("./position-store.service");
var PositionService = (function () {
    function PositionService(_storeService) {
        this._storeService = _storeService;
        this._positions = new Subject_1.Subject();
        this.positions = this._positions.asObservable();
        this._positionsCount = new Subject_1.Subject();
        this.positionsCount = this._positionsCount.asObservable();
        this.nodeId = 0;
    }
    PositionService.prototype.addPosition = function (newPosition) {
        return this._storeService.addPosition(newPosition);
    };
    PositionService.prototype.addPositionList = function (newPositions) {
        return this._storeService.addPositionList(newPositions);
    };
    PositionService.prototype.editPosition = function (modifiedPosition) {
        return this._storeService.editPosition(modifiedPosition);
    };
    PositionService.prototype.selectNode = function (nodeId) {
        var _this = this;
        this._positions.next(new Array());
        this._storeService.selectNode(nodeId).subscribe(function (positionsCount) { return _this._positionsCount.next(positionsCount); });
    };
    PositionService.prototype.selectPage = function (nodeId, pageNumber, pageSize) {
        var _this = this;
        this._storeService.selectPage(nodeId, pageNumber, pageSize)
            .subscribe(function (positions) { return _this._positions.next(positions); });
    };
    PositionService.prototype.getTag = function (tag, projectDisciplineId) {
        return this._storeService.getTag(tag, projectDisciplineId);
    };
    PositionService.prototype.deletePosition = function (position) {
        var result = new Subject_1.Subject();
        this._storeService.deletePosition(position).subscribe(function (deletedPosition) {
            result.next(deletedPosition);
        });
        return result.asObservable();
    };
    PositionService.prototype.clearNode = function (nodeId) {
        var result = new Subject_1.Subject();
        this._storeService.clearNode(nodeId).subscribe(function () {
            result.next();
        });
        return result.asObservable();
    };
    PositionService.prototype.pasteNode = function (sourceNodeId, targetNodeId) {
        var result = new Subject_1.Subject();
        this._storeService.pasteNode(sourceNodeId, targetNodeId).subscribe(function () {
            result.next();
        });
        return result.asObservable();
    };
    return PositionService;
}());
PositionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [position_store_service_1.PositionStoreService])
], PositionService);
exports.PositionService = PositionService;
//# sourceMappingURL=position.service.js.map