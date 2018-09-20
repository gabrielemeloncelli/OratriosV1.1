import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SetRefspecComponent } from './set-refspec.component';
import { SetRefspecRoutingModule } from './set-refspec-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
    CommonModule,
    SetRefspecRoutingModule,
    SharedModule
  ],
  declarations: [ SetRefspecComponent ]
})
export class SetRefspecModule {}
