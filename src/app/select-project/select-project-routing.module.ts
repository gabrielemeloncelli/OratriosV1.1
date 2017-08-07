import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelectProjectComponent } from './select-project.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'select-project', component: SelectProjectComponent}
  ])],
  exports: [RouterModule]
})
export class SelectProjectRoutingModule {}
