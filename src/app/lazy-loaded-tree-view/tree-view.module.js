"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:member-ordering no-unused-variable */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var electrical_project_root_1 = require("./electrical-project-root");
var tree_view_1 = require("./tree-view");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var TreeViewModule = (function () {
    function TreeViewModule() {
    }
    return TreeViewModule;
}());
TreeViewModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule],
        declarations: [tree_view_1.TreeView, electrical_project_root_1.ElectricalProjectRoot],
        exports: [tree_view_1.TreeView, electrical_project_root_1.ElectricalProjectRoot],
        providers: [http_1.HttpModule, forms_1.FormsModule]
    })
], TreeViewModule);
exports.TreeViewModule = TreeViewModule;
;
//# sourceMappingURL=tree-view.module.js.map