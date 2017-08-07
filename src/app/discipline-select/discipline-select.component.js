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
var ui_status_service_1 = require("../core/ui-status.service");
var project_discipline_service_1 = require("../core/project-discipline.service");
var DisciplineSelectComponent = (function () {
    function DisciplineSelectComponent(uiStatusService, projectDisciplineService, router) {
        this.uiStatusService = uiStatusService;
        this.projectDisciplineService = projectDisciplineService;
        this.router = router;
    }
    DisciplineSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectDisciplines = this.uiStatusService.projectDisciplines;
        console.log("discipline-select-component -- ngOnInit -- !!this.uiStatusService.projectDisciplines: " + !!this.uiStatusService.projectDisciplines);
        this.projectDisciplineService.discipline.subscribe(function (projectDiscipline) { return _this.projectDisciplineRetrieved(projectDiscipline); });
    };
    DisciplineSelectComponent.prototype.selectProjectDiscipline = function (projectDiscipline) {
        this.projectDisciplineService.selectDiscipline(projectDiscipline.project.id, projectDiscipline.discipline.code);
    };
    DisciplineSelectComponent.prototype.projectDisciplineRetrieved = function (projectDiscipline) {
        console.log('discipline-select.component -- projectDisciplineRetrieved'); //TODO:remove
        if (projectDiscipline != null) {
            this.uiStatusService.disciplineId = projectDiscipline.discipline.id;
            this.uiStatusService.disciplineCode = projectDiscipline.discipline.code;
            this.uiStatusService.projectDisciplineId = projectDiscipline.id;
            console.log('discipline-select.component -- projectDisciplineRetrieved -- navigate'); //TODO:remove
            this.router.navigate(['/fill-bom']);
        }
    };
    return DisciplineSelectComponent;
}());
DisciplineSelectComponent = __decorate([
    core_1.Component({
        selector: "discipline-select",
        templateUrl: "app/discipline-select/discipline-select.component.html",
        styleUrls: ['app/discipline-select/discipline-select.component.css']
    }),
    __metadata("design:paramtypes", [ui_status_service_1.UiStatusService, project_discipline_service_1.ProjectDisciplineService,
        router_1.Router])
], DisciplineSelectComponent);
exports.DisciplineSelectComponent = DisciplineSelectComponent;
//# sourceMappingURL=discipline-select.component.js.map