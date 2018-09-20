import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SetRefspecComponent } from './set-refspec.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'set-refspec', component: SetRefspecComponent}
  ])],
  exports: [RouterModule]
})
export class SetRefspecRoutingModule {}
