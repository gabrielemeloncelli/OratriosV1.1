"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_module_1 = require("../core/core.module");
var shared_module_1 = require("../shared/shared.module");
var discipline_select_component_1 = require("./discipline-select.component");
var discipline_select_routing_module_1 = require("./discipline-select-routing.module");
var DisciplineSelectModule = (function () {
    function DisciplineSelectModule() {
    }
    return DisciplineSelectModule;
}());
DisciplineSelectModule = __decorate([
    core_1.NgModule({
        imports: [core_module_1.CoreModule, discipline_select_routing_module_1.DisciplineSelectRoutingModule, shared_module_1.SharedModule],
        declarations: [discipline_select_component_1.DisciplineSelectComponent]
    })
], DisciplineSelectModule);
exports.DisciplineSelectModule = DisciplineSelectModule;
//# sourceMappingURL=discipline-select.module.js.map