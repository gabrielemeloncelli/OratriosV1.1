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
var http_1 = require("@angular/http");
//import { Observable }   from 'rxjs/observable';
var subject_1 = require("rxjs/subject");
var token_structure_1 = require("./token-structure");
var Rx_1 = require("rxjs/Rx"); //TODO: check
var TokenService = (function () {
    function TokenService(http) {
        this.http = http;
        this.TOKEN_URL = 'TOKEN';
        this.tokenValueSubject = new subject_1.Subject();
        this.tokenValue = this.tokenValueSubject.asObservable();
        this.errorSubject = new subject_1.Subject();
        this.error = this.errorSubject.asObservable();
        this.emptyObservable = new Rx_1.Observable();
    }
    TokenService.prototype.signIn = function (username, password, platformUserName) {
        var _this = this;
        var payload = 'grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        var headers = new http_1.Headers();
        headers.append("oratrios-plt", platformUserName);
        this.http.post(this.TOKEN_URL, payload, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.processResponse(res); }, function (err) {
            _this.errorSubject.next("Authentication failed");
        });
    };
    TokenService.prototype.processResponse = function (response) {
        var result = new token_structure_1.TokenStructure();
        result.access_token = response["access_token"];
        result.token_type = response["token_type"];
        result.userName = response["userName"];
        result.issued = new Date(Date.parse(response[".issued"]));
        result.expires = new Date(Date.parse(response[".expires"]));
        result.expires_in = response["expires_in"];
        this.tokenValueSubject.next(result);
    };
    TokenService.prototype.handleError = function (error) {
        console.log('token.service -- handleError'); //TODO: remove
        this.errorSubject.next("Authentication failed");
        return Rx_1.Observable.throw("");
    };
    return TokenService;
}());
TokenService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map