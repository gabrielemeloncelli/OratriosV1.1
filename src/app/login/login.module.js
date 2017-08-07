"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var shared_module_1 = require("../shared/shared.module");
var login_component_1 = require("./login.component");
var login_routing_module_1 = require("./login-routing.module");
var platform_user_service_1 = require("./platform-user.service");
var token_service_1 = require("./token.service");
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [login_routing_module_1.LoginRoutingModule,
            forms_1.FormsModule,
            common_1.CommonModule,
            shared_module_1.SharedModule],
        declarations: [login_component_1.LoginComponent],
        providers: [platform_user_service_1.PlatformUserService,
            token_service_1.TokenService]
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map