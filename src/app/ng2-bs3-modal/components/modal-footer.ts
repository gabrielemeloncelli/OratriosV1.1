import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
    selector: 'mbe-modal-footer',
    template: `
        <div class="modal-footer">
            <ng-content></ng-content>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary btn-saipem"
              data-dismiss="modal" (click)="modal.dismiss()">Close</button>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary bth-saipem" (click)="modal.close()">Save</button>
        </div>
    `
})
export class ModalFooterComponent {
    @Input() showDefaultButtons = false;
    constructor(private modal: ModalComponent) { }
}
