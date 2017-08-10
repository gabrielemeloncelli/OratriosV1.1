import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { PagerService } from './pager.service';

@Component({
    templateUrl: 'pager.component.html',
    selector: 'mbe-pager'
})

export class PagerComponent {

    private _totalItems = 0;
    private _pageSize = 10;
    @Output() onPageChanged = new EventEmitter<number>();

    // The total items
    @Input() set totalItems(value: number) {
        this._totalItems = value;
        this.refreshPager();
    }

    @Input() set pageSize(value: number) {
        this._pageSize = value;
        this.refreshPager();
    }


    // pager object
    pager: any = {};

    constructor(private pagerService: PagerService) {
        this.pager = this.pagerService.getPager(0, 0);
    }



    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages || page === this.pager.page) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this._totalItems, page, this._pageSize);
        this.pager.page = page;
        this.onPageChanged.emit(page);
    }

    refreshPager() {
        let currentPage = 0;
        if (!!this.pager) {
            if (!this.pager.page) {
                currentPage = 1;
            } else {
                currentPage = this.pager.page;
            }
        } else {
            currentPage = 1;
        }
        this.pager = this.pagerService.getPager(this._totalItems, currentPage, this._pageSize);
        if (currentPage > this.pager.totalPages) {
            currentPage = this.pager.startPage;
        }
        this.setPage(currentPage);
    }
}
