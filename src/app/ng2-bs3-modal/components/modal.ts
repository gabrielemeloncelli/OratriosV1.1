import { Component, OnDestroy, Input, Output, EventEmitter, Type, ElementRef, HostBinding, AfterViewInit } from '@angular/core';
import { ModalInstance, ModalResult } from './modal-instance';

import { ModalSize } from './modal-size';

@Component({
    selector: 'mbe-modal',
    template: `
        <div class="modal-dialog" [ngClass]="{ 'modal-sm': isSmall(), 'modal-lg': isLarge(), 'modal-dialog-fs': isFullScreen() }">
            <div class="modal-content" [ngClass]="{ 'modal-content-fs': isFullScreen() }">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['modal.css']
})
export class ModalComponent implements OnDestroy, AfterViewInit {

    @HostBinding('attr.class') boundClass = 'modal';
    @HostBinding('attr.role') boundRole = 'dialog';
    @HostBinding('attr.tabindex') boundTabIndex = '-1';

    private overrideSize: string = null;

    instance: ModalInstance;
    visible = false;

    @Input() animation = true;
    @Input() backdrop: string | boolean = true;
    @Input() keyboard = true;
    @Input() size: string;

    @Output() onClose: EventEmitter<any> = new EventEmitter(false);
    @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
    @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

    @HostBinding('class.fade') get fadeClass(): boolean { return this.animation; }
    @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean { return this.keyboard; }
    @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string | boolean { return this.backdrop; }

    constructor(private element: ElementRef) {
        this.instance = new ModalInstance(this.element);

        this.instance.hidden.subscribe((result) => {
            this.visible = this.instance.visible;
            if (result === ModalResult.Dismiss) {
                this.onDismiss.emit(undefined);
            }
        });

        this.instance.shown.subscribe(() => {
            this.onOpen.emit(undefined);
        });
    }

    ngOnDestroy() {
        return this.instance && this.instance.destroy();
    }

    ngAfterViewInit() {
        this.instance.initAfter();
    }

    routerCanDeactivate(): any {
        return this.ngOnDestroy();
    }

    open(size?: string): Promise<void> {
        if (ModalSize.validSize(size)) {
            this.overrideSize = size;
        }
        return this.instance.open().then(() => {
            this.visible = this.instance.visible;
        });
    }

    close(): Promise<void> {
        return this.instance.close().then(() => {
            this.onClose.emit(undefined);
        });
    }

    dismiss(): Promise<void> {
        return this.instance.dismiss();
    }

    private isSmall() {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    }

    private isLarge() {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    }
    private isFullScreen() {
        return this.overrideSize === ModalSize.FullScreen;
    }
}


