import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';

declare let jQuery: any;

export enum ModalResult {
    None,
    Close,
    Dismiss
}

export class ModalInstance {

    private suffix = '.ng2-bs3-modal';
    private shownEventName: string = 'shown.bs.modal' + this.suffix;
    private hiddenEventName: string = 'hidden.bs.modal' + this.suffix;
    private $modal: any;

    shown: Observable<void>;
    hidden: Observable<ModalResult>;
    result: number;
    visible = false;

    constructor(private element: ElementRef) {
        this.init();
    }

    public initAfter() {
        this.init();
    }

    open(): Promise<any> {
        return this.show();
    }

    close(): Promise<any> {
        this.result = ModalResult.Close;
        return this.hide();
    }

    dismiss(): Promise<any> {
        this.result = ModalResult.Dismiss;
        return this.hide();
    }

    destroy(): Promise<any> {
        return this.hide().then(() => {
            if (this.$modal) {
                this.$modal.data('bs.modal', null);
                this.$modal.remove();
            }
        });
    }

    private show() {
        const promise = toPromise(this.shown);
        this.resetData();
        this.$modal.modal();
        return promise;
    }

    private hide(): Promise<ModalResult> {
        if (this.$modal && this.visible) {
            const promise = toPromise(this.hidden);
            this.$modal.modal('hide');
            return promise;
        }
        return Promise.resolve(this.result);
    }

    private init() {
        this.$modal = jQuery(this.element.nativeElement);
        console.log('modal-instance -- init -- this.element.nativeElement.id: ' + this.element.nativeElement.id); // TODO: remove
        console.log('modal-instance -- init -- this.element: ' + JSON.stringify(this.element)); // TODO: remove
        console.log('modal-instance -- init -- this.$modal: ' + JSON.stringify(this.$modal)); // TODO: remove
        console.log('modal-instance -- init -- !!this.$modal.modal: ' + !!this.$modal.modal); // TODO: remove
        console.log('modal-instance -- init -- this.$modal.nodeName: ' + this.$modal.nodeName); // TODO: remove
        console.log('modal-instance -- init -- this.$modal.parentElement: ' + JSON.stringify(this.$modal.parentElement)); // TODO: remove
        this.$modal.appendTo('body');

        this.shown = Observable.fromEvent(this.$modal, this.shownEventName)
            .map(() => {
                this.visible = true;
            });

        this.hidden = Observable.fromEvent(this.$modal, this.hiddenEventName)
            .map(() => {
                const result = ((!this.result) || (this.result === ModalResult.None))
                    ? ModalResult.Dismiss : this.result;

                this.result = ModalResult.None;
                this.visible = false;

                return result;
            });
    }

    private resetData() {
        this.$modal.removeData();
        this.$modal.data('backdrop', booleanOrValue(this.$modal.attr('data-backdrop')));
        this.$modal.data('keyboard', booleanOrValue(this.$modal.attr('data-keyboard')));
    }
}

function booleanOrValue(value: any) {
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }
    return value;
}

function toPromise<T>(observable: Observable<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        observable.subscribe(next => {
            resolve(next);
        });
    });
}

