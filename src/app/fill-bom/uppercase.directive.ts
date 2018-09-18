import {Directive, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Directive({
    selector: '[uppercase]',
    host: {
        '[value]': 'uppercase',
        '(input)': 'format($event.target.value)'
    }
})
export class Uppercase implements OnInit {

    @Input() uppercase: string;
    @Output() uppercaseChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
        if(this.uppercase == null) {
            setTimeout(() => this.uppercaseChange.next(''), 100);           
        } else {
            this.format(this.uppercase);
        }
    }

    format(value) {
        if (value != null) {
            value = value.toUpperCase();
            this.uppercaseChange.next(value);
        } else {
            value = '';
            this.uppercaseChange.next(value);
        }
    }

}