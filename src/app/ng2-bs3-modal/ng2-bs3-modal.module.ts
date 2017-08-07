import { NgModule,
          Type }        from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent }       from './components/modal';
import { ModalHeaderComponent } from './components/modal-header';
import { ModalBodyComponent }   from './components/modal-body';
import { ModalFooterComponent } from './components/modal-footer';
import { AutofocusDirective }   from './directives/autofocus';


@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, AutofocusDirective ],
  exports:      [ ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, AutofocusDirective ]
})
export class ModalModule {}
