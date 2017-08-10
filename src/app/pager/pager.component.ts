import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { PagerService } from './pager.service';

@Component({
    templateUrl: 'pager.component.html',
    selector: 'pager'
})

export class PagerComponent {

    private _totalItems = 0;
    private _pageSize = 10;
    @Output() onPageChanged = new EventEmitter<number>();

    // The total items
    @Input() set totalItems(value: number) {
        this._totalItems = value;
        console.log('pager.component -- set totalItems -- this._totalItems: ' + this._totalItems); // TODO: remove
        console.log('pager.component -- set totalItems -- this._pageSize: ' + this._pageSize); // TODO: remove
        this.refreshPager();
    }

    @Input() set pageSize(value: number) {        
        this._pageSize = value;
        console.log('pager.component -- set pageSize -- this._totalItems: ' + this._totalItems); // TODO: remove
        console.log('pager.component -- set pageSize -- this._pageSize: ' + this._pageSize); // TODO: remove
        this.refreshPager();
    }


    // pager object
    pager: any = {};

    constructor(private pagerService: PagerService) {
        this.pager = this.pagerService.getPager(0, 0);
    }



    setPage(page: number) {
        console.log("pager.component -- setPage -- page: " + page); //TODO: remove
        console.log("pager.component -- setPage -- this.pager.totalPages: " + this.pager.totalPages); //TODO: remove
        if (page < 1 || page > this.pager.totalPages || page === this.pager.page) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this._totalItems, page, this._pageSize);
        this.pager.page = page;
        this.onPageChanged.emit(page);

        console.log("pager.component -- setPage -- this.pager.page: " + this.pager.page); //TODO: remove


    }

    refreshPager() {
        let currentPage = 0;
        if (!!this.pager) {
            if (!this.pager.page) {
                currentPage = 1;
            }
            else {
                currentPage = this.pager.page;
            }
        }
        else {
            currentPage = 1;
        }
        console.log('pager.component -- refreshPager -- this._totalItems: ' + this._totalItems); // TODO: remove
        console.log('pager.component -- refreshPager -- currentPage: ' + currentPage); // TODO: remove
        console.log('pager.component -- refreshPager -- this._pageSize: ' + this._pageSize); // TODO: remove
        this.pager = this.pagerService.getPager(this._totalItems, currentPage, this._pageSize);
        if (currentPage > this.pager.totalPages) {
            currentPage = this.pager.startPage;
        }
        this.setPage(currentPage);
    }
}