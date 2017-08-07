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
var LoginComponent = (function () {
    function LoginComponent() {
        //campi del form del login
        this.usernameLabel = "Username";
        this.password = "Password";
        this.rememberMe = "Remember Me";
        this.login = "BoM-ELE - Manual BoM Electric";
        this.signIn = "Sign-in";
        // evento che restituisce l'esito della validazione in echo
        this.isAuthorizated = new core_1.EventEmitter();
        //indica se l'utente ha passato o meno l'autenticazione
        this.isUserAuthorizated = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loading = false;
        this.username = (this.userInfo != null) ? this.userInfo.username : "";
        this.userPassword = (this.userInfo != null) ? this.userInfo.password : "";
        this.userRememberMe = (this.userInfo != null) ? this.userInfo.rememberMe : false;
    };
    return LoginComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "userInfo", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LoginComponent.prototype, "isAuthorizated", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'app/login/login.component.html',
        styleUrls: ['app/login/login.component.css'],
    }),
    __metadata("design:paramtypes", [])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map