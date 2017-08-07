import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../ng2-bs3-modal/ng2-bs3-modal.module';
import { SelectProjectComponent } from './select-project.component';
import { SelectProjectRoutingModule } from './select-project-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
    CommonModule,
    ModalModule,
    SelectProjectRoutingModule,
    SharedModule
  ],
  declarations: [ SelectProjectComponent ]
})
export class SelectProjectModule {}
