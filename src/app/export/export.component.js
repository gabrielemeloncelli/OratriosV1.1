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
var ui_status_service_1 = require("../core/ui-status.service");
var export_service_1 = require("./export.service");
var ExportComponent = (function () {
    function ExportComponent(exportService, uiStatusService) {
        this.exportService = exportService;
        this.uiStatusService = uiStatusService;
    }
    ExportComponent.prototype.exportAll = function () {
        var _this = this;
        this.exportQueued = true;
        this.exportResult = "Sending request";
        this.exportSuccess = false;
        this.exportService.exportAll(this.uiStatusService.projectDisciplineId)
            .subscribe(function (res) {
            _this.downloadFileUrl = res;
            console.log("export.component -- exportAll -- this.downloadFileUrl: <" + _this.downloadFileUrl + ">"); //TODO: remove
            _this.exportResult = 'Export success';
            _this.exportQueued = true;
            _this.exportSuccess = true;
        }, function (error) {
            _this.exportResult = 'Export failed';
            _this.exportSuccess = false;
        });
    };
    return ExportComponent;
}());
ExportComponent = __decorate([
    core_1.Component({
        selector: 'export',
        templateUrl: 'app/export/export.component.html',
    }),
    __metadata("design:paramtypes", [export_service_1.ExportService, ui_status_service_1.UiStatusService])
], ExportComponent);
exports.ExportComponent = ExportComponent;
//# sourceMappingURL=export.component.js.map