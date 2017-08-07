import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DisciplineSelectComponent } from './discipline-select.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: 'discipline-select', component: DisciplineSelectComponent}
  ])],
  exports: [ RouterModule ]
})
export class DisciplineSelectRoutingModule {}
