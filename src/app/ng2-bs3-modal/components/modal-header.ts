import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
    selector: 'mbe-modal-header',
    template: `
        <div class="modal-header">
            <button *ngIf="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss()">
                <span aria-hidden="true">&times;</span>
            </button>
            <ng-content></ng-content>
        </div>
    `
})
export class ModalHeaderComponent {
    @Input('showClose') showClose = false;
    constructor(private modal: ModalComponent) { }
}
