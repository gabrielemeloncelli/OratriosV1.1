import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExportComponent } from './export.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'export', component: ExportComponent}
  ])],
  exports: [RouterModule]
})
export class ExportRoutingModule {}
