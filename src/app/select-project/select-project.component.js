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
var router_1 = require("@angular/router");
var project_discipline_service_1 = require("../core/project-discipline.service");
var ui_status_service_1 = require("../core/ui-status.service");
var session_service_1 = require("../core/session.service");
var SelectProjectComponent = (function () {
    function SelectProjectComponent(_projectDisciplineService, _uiStatusService, _router, _sessionService) {
        this._projectDisciplineService = _projectDisciplineService;
        this._uiStatusService = _uiStatusService;
        this._router = _router;
        this._sessionService = _sessionService;
        this._mockProjects = new Array();
        //this.buildMockProjects();
        //this.projects = this._mockProjects;
        this._uiStatusService.projectCode = "";
        this._uiStatusService.projectId = 0;
        this._uiStatusService.disciplineId = 0;
        this._uiStatusService.disciplineCode = "";
        this._uiStatusService.projectDisciplineId = 0;
    }
    SelectProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._projectDisciplineService.projects.subscribe(function (projects) { return _this.projectsRetrieved(projects); });
        this._projectDisciplineService.projectDisciplines.subscribe(function (projectDisciplines) { return _this.projectDisciplinesRetrieved(projectDisciplines); });
        this._projectDisciplineService.discipline.subscribe(function (projectDiscipline) { return _this.projectDisciplineRetrieved(projectDiscipline); });
        this._sessionService.user.subscribe(function (u) {
            _this._uiStatusService.userCode = u.code;
            _this._uiStatusService.userIsAdministrator = u.isAdministrator;
            _this.username = u.code;
            _this._projectDisciplineService.selectUser(_this._uiStatusService.userCode);
        });
        this._sessionService.retrieveUserData(this._uiStatusService.platformAuthenticatedUserName);
    };
    SelectProjectComponent.prototype.selectProject = function (code, name) {
        this._uiStatusService.projectDescription = name;
        this._projectDisciplineService.selectProject(code, this._uiStatusService.userCode);
    };
    SelectProjectComponent.prototype.projectDisciplinesRetrieved = function (projectDisciplines) {
        if (projectDisciplines != null && projectDisciplines.length > 0) {
            console.log("select-project.component -- projectDisciplinesRetrieved -- projectDisciplines.length: " + projectDisciplines.length); //TODO:remove
            var selectedDiscipline = projectDisciplines[0];
            this._uiStatusService.projectCode = selectedDiscipline.project.code;
            this._uiStatusService.projectId = selectedDiscipline.project.id;
            this._uiStatusService.selectProject(selectedDiscipline.project.id);
            if (projectDisciplines.length === 1) {
                this._projectDisciplineService.selectDiscipline(this._uiStatusService.projectId, selectedDiscipline.discipline.code);
            }
            else {
                this._uiStatusService.projectDisciplines = projectDisciplines;
                this._router.navigate(['/discipline-select']);
            }
        }
    };
    SelectProjectComponent.prototype.projectDisciplineRetrieved = function (projectDiscipline) {
        console.log('select-project.component -- projectDisciplineRetrieved'); //TODO:remove
        if (projectDiscipline != null) {
            this._uiStatusService.disciplineId = projectDiscipline.discipline.id;
            this._uiStatusService.disciplineCode = projectDiscipline.discipline.code;
            this._uiStatusService.projectDisciplineId = projectDiscipline.id;
            console.log('select-project.component -- projectDisciplineRetrieved -- navigate'); //TODO:remove
            this._router.navigate(['/fill-bom']);
        }
    };
    SelectProjectComponent.prototype.projectsRetrieved = function (projects) {
        if (projects == null) {
            this.projects = new Array();
        }
        else {
            this.projects = projects;
        }
    };
    return SelectProjectComponent;
}());
SelectProjectComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/select-project/select-project.component.html',
        styleUrls: ['app/select-project/select-project.component.css']
    }),
    __metadata("design:paramtypes", [project_discipline_service_1.ProjectDisciplineService, ui_status_service_1.UiStatusService,
        router_1.Router, session_service_1.SessionService])
], SelectProjectComponent);
exports.SelectProjectComponent = SelectProjectComponent;
//# sourceMappingURL=select-project.component.js.map