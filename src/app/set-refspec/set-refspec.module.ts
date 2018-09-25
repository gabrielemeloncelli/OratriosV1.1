import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SetRefspecComponent } from './set-refspec.component';
import { SetRefspecRoutingModule } from './set-refspec-routing.module';
import { SharedModule } from '../shared/shared.module';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { PagerModule } from '../pager/pager.module';

@NgModule({
    imports: [
    CommonModule,
    SetRefspecRoutingModule,
    SharedModule,
    FormsModule,
    PagerModule
  ],
  declarations: [ SetRefspecComponent ]
})
export class SetRefspecModule {}
