"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var export_component_1 = require("./export.component");
var export_service_1 = require("./export.service");
var export_routing_module_1 = require("./export-routing.module");
var core_module_1 = require("../core/core.module");
var ExportModule = (function () {
    function ExportModule() {
    }
    return ExportModule;
}());
ExportModule = __decorate([
    core_1.NgModule({
        imports: [export_routing_module_1.ExportRoutingModule, core_module_1.CoreModule],
        exports: [core_module_1.CoreModule],
        declarations: [export_component_1.ExportComponent],
        providers: [export_service_1.ExportService]
    })
], ExportModule);
exports.ExportModule = ExportModule;
//# sourceMappingURL=export.module.js.map