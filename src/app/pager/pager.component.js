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
var pager_service_1 = require("./pager.service");
var PagerComponent = (function () {
    function PagerComponent(pagerService) {
        this.pagerService = pagerService;
        this.onPageChanged = new core_1.EventEmitter();
        // pager object
        this.pager = {};
        this.pager = this.pagerService.getPager(0, 0);
    }
    Object.defineProperty(PagerComponent.prototype, "totalItems", {
        // The total items
        set: function (value) {
            this._totalItems = value;
            var currentPage = 0;
            if (!!this.pager) {
                if (!this.pager.page) {
                    currentPage = 1;
                }
                else {
                    currentPage = this.pager.page;
                }
            }
            else {
                currentPage = 1;
            }
            this.pager = this.pagerService.getPager(this._totalItems, currentPage);
            if (currentPage > this.pager.totalPages) {
                currentPage = this.pager.startPage;
            }
            this.setPage(currentPage);
        },
        enumerable: true,
        configurable: true
    });
    PagerComponent.prototype.setPage = function (page) {
        console.log("pager.component -- setPage -- page: " + page); //TODO: remove
        console.log("pager.component -- setPage -- this.pager.totalPages: " + this.pager.totalPages); //TODO: remove
        if (page < 1 || page > this.pager.totalPages || page === this.pager.page) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this._totalItems, page);
        this.pager.page = page;
        this.onPageChanged.emit(page);
        console.log("pager.component -- setPage -- this.pager.page: " + this.pager.page); //TODO: remove
    };
    return PagerComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PagerComponent.prototype, "onPageChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PagerComponent.prototype, "totalItems", null);
PagerComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/pager/pager.component.html',
        selector: 'pager'
    }),
    __metadata("design:paramtypes", [pager_service_1.PagerService])
], PagerComponent);
exports.PagerComponent = PagerComponent;
//# sourceMappingURL=pager.component.js.map