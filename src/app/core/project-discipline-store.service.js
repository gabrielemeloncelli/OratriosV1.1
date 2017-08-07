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
var Subject_1 = require("rxjs/Subject");
var project_1 = require("./project");
var discipline_1 = require("./discipline");
var project_discipline_1 = require("./project-discipline");
var ProjectDisciplineStoreService = (function () {
    function ProjectDisciplineStoreService(_http) {
        this._http = _http;
        this.BASE_URL = 'api/projectdiscipline';
        this.PRJ_BASE_URL = 'api/projects';
    }
    ProjectDisciplineStoreService.prototype.selectUser = function (databaseUserName) {
        var _this = this;
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.PRJ_BASE_URL + '?databaseUserName=' + encodeURIComponent(databaseUserName))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(res.map(function (pos) { return _this.mapProject(pos); }));
        });
        return result.asObservable();
    };
    ProjectDisciplineStoreService.prototype.selectProject = function (projectCode, databaseUserName) {
        var _this = this;
        var _resultArray = new Array();
        var result = new Subject_1.Subject();
        this._http
            .get(this.BASE_URL + "/project?projectCode=" + encodeURIComponent(projectCode) +
            '&databaseUserName=' + databaseUserName)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            result.next(res.map(function (pos) { return _this.mapProjectDiscipline(pos); }));
        });
        return result.asObservable();
    };
    ProjectDisciplineStoreService.prototype.selectDiscipline = function (projectId, disciplineCode) {
        var _this = this;
        var result = new Subject_1.Subject();
        this._http.get(this.BASE_URL + '/' + projectId + '/' + disciplineCode)
            .map(function (res) { return res.json(); })
            .subscribe(function (dis) { return result.next(_this.mapProjectDiscipline(dis)); });
        return result.asObservable();
    };
    ProjectDisciplineStoreService.prototype.mapProjectDiscipline = function (res) {
        var resultProject = new project_1.Project(res.project.id, res.project.code, res.project.description);
        var resultDiscipline = new discipline_1.Discipline(res.discipline.id, res.discipline.code);
        return new project_discipline_1.ProjectDiscipline(res.id, resultProject, resultDiscipline);
    };
    ProjectDisciplineStoreService.prototype.mapProject = function (res) {
        return new project_1.Project(0, res.code, res.description);
    };
    return ProjectDisciplineStoreService;
}());
ProjectDisciplineStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProjectDisciplineStoreService);
exports.ProjectDisciplineStoreService = ProjectDisciplineStoreService;
//# sourceMappingURL=project-discipline-store.service.js.map