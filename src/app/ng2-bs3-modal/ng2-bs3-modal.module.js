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
var modal_1 = require("./components/modal");
var modal_header_1 = require("./components/modal-header");
var modal_body_1 = require("./components/modal-body");
var modal_footer_1 = require("./components/modal-footer");
var autofocus_1 = require("./directives/autofocus");
var ModalModule = (function () {
    function ModalModule() {
    }
    return ModalModule;
}());
ModalModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [modal_1.ModalComponent, modal_header_1.ModalHeaderComponent, modal_body_1.ModalBodyComponent, modal_footer_1.ModalFooterComponent, autofocus_1.AutofocusDirective],
        exports: [modal_1.ModalComponent, modal_header_1.ModalHeaderComponent, modal_body_1.ModalBodyComponent, modal_footer_1.ModalFooterComponent, autofocus_1.AutofocusDirective]
    })
], ModalModule);
exports.ModalModule = ModalModule;
//# sourceMappingURL=ng2-bs3-modal.module.js.map