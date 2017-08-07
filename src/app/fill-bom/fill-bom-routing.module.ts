import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FillBomComponent } from './fill-bom.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'fill-bom', component: FillBomComponent}
  ])],
  exports: [RouterModule]
})
export class FillBomRoutingModule {}
