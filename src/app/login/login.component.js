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
//import { Validators, FormGroup, FormControl } from '@angular/forms';
var router_1 = require("@angular/router");
var ui_status_service_1 = require("../core/ui-status.service");
var platform_user_service_1 = require("./platform-user.service");
var token_service_1 = require("./token.service");
var LoginComponent = (function () {
    function LoginComponent(router, uiStatuService, platformUserService, tokenService) {
        this.router = router;
        this.uiStatuService = uiStatuService;
        this.platformUserService = platformUserService;
        this.tokenService = tokenService;
        this.loaded = false;
        this.useOtherUser = false;
        this.errorMessage = "";
        //campi del form del login
        this.usernameLabel = "Username";
        this.password = "Password";
        this.rememberMe = "Remember Me";
        this.login = "BoM ELE - Manual BoM Electrical";
        this.signIn = "Sign-in";
        // username e password dell'utente se queste sono memorizzate nello storage
        //@Input() userInfo: any;
        // evento che restituisce l'esito della validazione in echo
        //@Output() isAuthorizated: EventEmitter<any> = new EventEmitter();
        //indica se l'utente ha passato o meno l'autenticazione
        this.isUserAuthorizated = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = false;
        this.tokenService.tokenValue.subscribe(function (token) {
            _this.errorMessage = "";
            _this.uiStatuService.authToken = token.access_token;
            _this.uiStatuService.platformAuthenticatedUserName = token.userName;
            _this.router.navigate(['select-project']);
        });
        this.tokenService.error.subscribe(function (error) {
            _this.errorMessage = error;
            _this.loading = false;
        });
        // Get the username of the user autehenticated by the platform
        this.platformUserService.platformUser.subscribe(function (user) {
            _this.uiStatuService.platformAuthenticatedUserName = user.code;
            _this.useOtherUser = !user.code;
            _this.loaded = true;
        });
        this.platformUserService.getUser();
        //this.username = (this.userInfo != null) ? this.userInfo.username : "";
        //this.userPassword = (this.userInfo != null) ? this.userInfo.password : "";
        //this.userRememberMe = (this.userInfo != null) ? this.userInfo.rememberMe : false;
    };
    LoginComponent.prototype.singnInPvt = function (usePlatform) {
        this.errorMessage = "Authenticating ...";
        this.loading = true;
        if (usePlatform) {
            this.tokenService.signIn(this.uiStatuService.platformAuthenticatedUserName, "", this.uiStatuService.platformAuthenticatedUserName);
        }
        else {
            this.tokenService.signIn(this.username, this.userPassword, "");
        }
    };
    LoginComponent.prototype.SignInPlatform = function () {
        this.singnInPvt(true);
    };
    LoginComponent.prototype.SignIn = function () {
        this.singnInPvt(false);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'app/login/login.component.html',
        styleUrls: ['app/login/login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        ui_status_service_1.UiStatusService,
        platform_user_service_1.PlatformUserService,
        token_service_1.TokenService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map