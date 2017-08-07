import { Component } from '@angular/core';

import { UiStatusService } from '../core/ui-status.service';
import { ExportService } from './export.service';

@Component({
        selector: 'mbe-export',
        templateUrl: 'export.component.html',
    })
export class ExportComponent {
    exportResult: string;
    exportQueued: boolean;
    exportSuccess: boolean;
    downloadFileUrl: string;

    constructor(private exportService: ExportService, private uiStatusService: UiStatusService) {}

    exportAll(): void {
        this.exportQueued = true;
        this.exportResult = 'Sending request';
        this.exportSuccess = false;
        this.exportService.exportAll(this.uiStatusService.projectDisciplineId)
        .subscribe(res => {
            this.downloadFileUrl = res;
            console.log('export.component -- exportAll -- this.downloadFileUrl: <' + this.downloadFileUrl + '>'); // TODO: remove
            this.exportResult = 'Export success';
            this.exportQueued = true;
            this.exportSuccess = true;
        },
        error => {
            this.exportResult = 'Export failed';
            this.exportSuccess = false;
        });
    }
}
