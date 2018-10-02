import {
    Component,
    OnInit,
    AfterViewInit
}
    from '@angular/core';

import { RefSpec } from '../core/ref-spec';
import { RefSpecDto } from '../core/ref-spec-dto';
import { RefSpecService } from './ref-spec.service';
import { UiStatusService } from '../core/ui-status.service';
import { RefSpecDtoUpdateResult } from './ref-spec-dto-update-result';

enum RefSpecFilterType {
    None = 1,
    Commodity,
    Tag
}

@Component({
    templateUrl: 'set-refspec.component.html',
    styleUrls: ['set-refspec.component.css'],
    selector: 'set-refspec'
})
export class SetRefspecComponent implements OnInit {
    public commodityTemplate: string;
    public tagTemplate: string;
    public refspecs: RefSpec[];
    public isBusy = false;
    public totItems = 0;
    public currentFilter = RefSpecFilterType.None;
    private _updatingIdx = -1;


    constructor(private _refSpecService: RefSpecService,
        private _uiStatusService: UiStatusService) { }

    ngOnInit() {
        this.refspecs = [];
        this.currentFilter = RefSpecFilterType.None;
    }

    ngAfterViewInit() { 
        this._refSpecService.count.subscribe(count => {
            this.totItems = count;
            setTimeout(() => this.fillNewSearch());
        });
        this._refSpecService.refSpecs.subscribe(specs => {
            var spec: RefSpecDto;
            this.refspecs = [];
            for (spec of specs) {
                this.refspecs.push(new RefSpec(spec));
            }
            this.resetBusy();
        });
        this._refSpecService.updatedSpec.subscribe(res => {
            if (res.dto != null && ((res.dto.commodityCode != null && res.dto.commodityCode != '')
                || (res.dto.tag != null && res.dto.tag != ''))) {
                this.refspecs[this._updatingIdx].dirty = false;
                this.refspecs[this._updatingIdx].hasError = false;
                if (res.errorMessage != null && res.errorMessage != '') {
                    this.refspecs[this._updatingIdx].dto.refSpec = res.dto.refSpec;
                    this.refspecs[this._updatingIdx].hasError = true;
                }
            }
            this._updatingIdx = -1;
            this.resetBusy();
        });
        this._refSpecService.getCount(this._uiStatusService.projectDisciplineId, null, null);
    }

    public setDirty(idx: number): void {
        this.refspecs[idx].dirty = true;
    }

    public saveDirty(idx: number): void {
        this.setBusy();
        this._updatingIdx = idx;
        this._refSpecService.updateRefSpec(this._uiStatusService.projectDisciplineId, this.refspecs[idx].dto);
        this.refspecs[idx].dirty = false;
    }

    public findCommodity(): void {
        this.setBusy();
        setTimeout(() => this.tagTemplate = null, 100);
        this.currentFilter = RefSpecFilterType.Commodity;
        this._refSpecService.getCount(this._uiStatusService.projectDisciplineId, this.commodityTemplate, null);
    }

    public findCommodityDetails(skip = 0, take = 10): void {
        this._refSpecService.getAll(this._uiStatusService.projectDisciplineId, this.commodityTemplate, null, skip, take);
    }

    public findTag(): void {
        this.setBusy();
        setTimeout(() => this.commodityTemplate = null, 100);
        this.currentFilter = RefSpecFilterType.Tag;
        this._refSpecService.getCount(this._uiStatusService.projectDisciplineId, null, this.tagTemplate);
    }

    public findTagDetails(skip = 0, take = 10): void {
        this._refSpecService.getAll(this._uiStatusService.projectDisciplineId, null, this.tagTemplate, skip, take);
    }

    public findAll(): void {
        this.setBusy();
        setTimeout(() => this.commodityTemplate = null, 100);
        setTimeout(() => this.tagTemplate = null, 100);
        this.currentFilter = RefSpecFilterType.None;
        this._refSpecService.getCount(this._uiStatusService.projectDisciplineId, null, null);
    }

    public findAllDetails(skip = 0, take = 10): void {
        this._refSpecService.getAll(this._uiStatusService.projectDisciplineId, null, null, skip, take);
    }

    private pageChanged(pageNumber: number): void {
        switch (this.currentFilter) {
            case RefSpecFilterType.None: {
                this.findAllDetails((pageNumber - 1) * 10, 10);
                break;
            }
            case RefSpecFilterType.Commodity: {
                this.findCommodityDetails((pageNumber - 1) * 10, 10);
                break;
            }
            case RefSpecFilterType.Tag: {
                this.findTagDetails((pageNumber - 1) * 10, 10);
                break;
            }
        }

    }


    private setBusy(): void {
        setTimeout(() => { this.isBusy = true }, 100);
    }

    private resetBusy(): void {
        setTimeout(() => { this.isBusy = false }, 100);
    }

    private fillNewSearch(): void {
        this.pageChanged(1);
    }






}