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
var Subject_1 = require("rxjs/Subject");
var project_discipline_store_service_1 = require("./project-discipline-store.service");
var ProjectDisciplineService = (function () {
    function ProjectDisciplineService(_storeService) {
        this._storeService = _storeService;
        this._projects = new Subject_1.Subject();
        this.projects = this._projects.asObservable();
        this._projectDisciplines = new Subject_1.Subject();
        this.projectDisciplines = this._projectDisciplines.asObservable();
        this._discipline = new Subject_1.Subject();
        this.discipline = this._discipline.asObservable();
        this.nodeId = 0;
    }
    ProjectDisciplineService.prototype.selectUser = function (databaseUserName) {
        var _this = this;
        this._storeService.selectUser(databaseUserName).subscribe(function (projects) { return _this._projects.next(projects); });
    };
    ProjectDisciplineService.prototype.selectProject = function (projectCode, databaseUserName) {
        var _this = this;
        this._storeService.selectProject(projectCode, databaseUserName).subscribe(function (projectDisciplines) { return _this._projectDisciplines.next(projectDisciplines); });
    };
    ProjectDisciplineService.prototype.selectDiscipline = function (projectId, disciplineCode) {
        var _this = this;
        this._storeService.selectDiscipline(projectId, disciplineCode).subscribe(function (discipline) { return _this._discipline.next(discipline); });
    };
    return ProjectDisciplineService;
}());
ProjectDisciplineService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [project_discipline_store_service_1.ProjectDisciplineStoreService])
], ProjectDisciplineService);
exports.ProjectDisciplineService = ProjectDisciplineService;
//# sourceMappingURL=project-discipline.service.js.map