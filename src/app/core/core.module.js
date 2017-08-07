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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:member-ordering no-unused-variable */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var angular2_select_1 = require("angular2-select");
var session_service_1 = require("./session.service");
var ng2_bs3_modal_module_1 = require("../ng2-bs3-modal/ng2-bs3-modal.module");
var project_discipline_service_1 = require("./project-discipline.service");
var project_discipline_store_service_1 = require("./project-discipline-store.service");
var node_type_service_1 = require("./node-type.service");
var tree_node_service_1 = require("./tree-node.service");
var ui_status_service_1 = require("./ui-status.service");
var CoreModule = (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule,
            forms_1.FormsModule,
            angular2_select_1.SelectModule,
            ng2_bs3_modal_module_1.ModalModule,
            ng2_bootstrap_1.BsDropdownModule.forRoot(),
            ng2_bootstrap_1.TooltipModule.forRoot()],
        exports: [common_1.CommonModule,
            forms_1.FormsModule,
            angular2_select_1.SelectModule,
            ng2_bs3_modal_module_1.ModalModule,
            ng2_bootstrap_1.BsDropdownModule,
            ng2_bootstrap_1.TooltipModule],
        providers: [node_type_service_1.NodeTypeService,
            tree_node_service_1.TreeNodeService,
            ui_status_service_1.UiStatusService,
            project_discipline_service_1.ProjectDisciplineService,
            project_discipline_store_service_1.ProjectDisciplineStoreService,
            session_service_1.SessionService]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map