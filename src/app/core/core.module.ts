import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  BsDropdownModule,
  TooltipModule
} from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';

import { SessionService } from './session.service';
import { ModalModule } from '../ng2-bs3-modal/ng2-bs3-modal.module';
import { ProjectDisciplineService } from './project-discipline.service';
import { ProjectDisciplineStoreService } from './project-discipline-store.service';
import { NodeTypeService } from './node-type.service';
import { TreeNodeService } from './tree-node.service';
import { UiStatusService } from './ui-status.service';


@NgModule({
  imports: [CommonModule,
    FormsModule,
    SelectModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule],
  exports: [CommonModule,
    FormsModule,
    SelectModule,
    ModalModule,
    BsDropdownModule,
    TooltipModule,
    BrowserAnimationsModule],
  providers: [NodeTypeService,
    TreeNodeService,
    UiStatusService,
    ProjectDisciplineService,
    ProjectDisciplineStoreService,
    SessionService]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
