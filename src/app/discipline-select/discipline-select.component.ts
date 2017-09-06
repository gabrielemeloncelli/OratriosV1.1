import { Component,
            OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiStatusService } from '../core/ui-status.service';
import { ProjectDisciplineService } from '../core/project-discipline.service';
import { ProjectDiscipline } from '../core/project-discipline';
import { Discipline } from '../core/discipline';

@Component(
    {
        selector: 'mbe-discipline-select',
        templateUrl: 'discipline-select.component.html',
        styleUrls: [ 'discipline-select.component.css']
    }
)
export class DisciplineSelectComponent implements OnInit {
    public projectDisciplines: ProjectDiscipline[];
    constructor(private uiStatusService: UiStatusService, private projectDisciplineService: ProjectDisciplineService,
        private router: Router) {}

    ngOnInit() {
        this.projectDisciplines = this.uiStatusService.projectDisciplines;
        this.projectDisciplineService.discipline.subscribe(
            projectDiscipline => this.projectDisciplineRetrieved(projectDiscipline));
    }

    selectProjectDiscipline(projectDiscipline: ProjectDiscipline) {
        this.projectDisciplineService.selectDiscipline(projectDiscipline.project.id, projectDiscipline.discipline.code);
    }

    projectDisciplineRetrieved(projectDiscipline: ProjectDiscipline) {
        if (projectDiscipline != null) {
            this.uiStatusService.disciplineId = projectDiscipline.discipline.id;
            this.uiStatusService.disciplineCode = projectDiscipline.discipline.code;
            this.uiStatusService.projectDisciplineId = projectDiscipline.id;
            this.router.navigate(['/fill-bom']);
        }
    }
}
