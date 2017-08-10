import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagerService } from './pager.service';
import { PagerComponent } from './pager.component';


@NgModule({
  imports: [ CommonModule ],
  declarations: [ PagerComponent ],
  exports: [ PagerComponent ],
  providers: [ PagerService ]
})
export class PagerModule {

  constructor () {

  }

}
