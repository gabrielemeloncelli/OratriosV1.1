"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_bs3_modal_module_1 = require("../ng2-bs3-modal/ng2-bs3-modal.module");
var select_project_component_1 = require("./select-project.component");
var select_project_routing_module_1 = require("./select-project-routing.module");
var shared_module_1 = require("../shared/shared.module");
var SelectProjectModule = (function () {
    function SelectProjectModule() {
    }
    return SelectProjectModule;
}());
SelectProjectModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            ng2_bs3_modal_module_1.ModalModule,
            select_project_routing_module_1.SelectProjectRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [select_project_component_1.SelectProjectComponent]
    })
], SelectProjectModule);
exports.SelectProjectModule = SelectProjectModule;
//# sourceMappingURL=select-project.module.js.map