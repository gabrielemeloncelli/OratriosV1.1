import { NgModule } from '@angular/core';

import { ExportComponent } from './export.component';
import { ExportService } from './export.service';
import { ExportRoutingModule } from './export-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule(
    {
        imports: [ ExportRoutingModule, CoreModule ],
        exports: [ CoreModule ],
        declarations: [ ExportComponent ],
        providers: [ ExportService ]
    }
)
export class ExportModule {}
