/* tslint:disable:member-ordering no-unused-variable */
import { NgModule } from '@angular/core';
import { ToasterModule,
          ToasterService } from 'angular2-toaster';

import { GridModule } from '@progress/kendo-angular-grid';

import { PositionsListComponent } from './positions-list.component';
import { AddPositionComponent } from './add-position.component';
import { CommodityGroupService } from './commodity-group.service';
import { CommodityGroupStoreService } from './commodity-group-store.service';
import { CommodityPartService } from './commodity-part.service';
import { CommodityPartStoreService } from './commodity-part-store.service';
import { MaterialStoreService } from './material-store.service';
import { MaterialService } from './material.service';
import { PositionService } from './position.service';
import { PositionStoreService } from './position-store.service';
import { CommodityTable } from './commodity-table';
import { CommodityTableService } from './commodity-table.service';
import { CommodityTableStoreService } from './commodity-table-store.service';
import { CommodityTableValue } from './commodity-table-value';
import { CommodityTableValueService } from './commodity-table-value.service';
import { CommodityTableValueStoreService } from './commodity-table-value-store.service';
import { AttributeStoreService } from './attribute-store.service';
import { AttributeService } from './attribute.service';
import { FillBomRoutingModule } from './fill-bom-routing.module';
import { FillBomComponent } from './fill-bom.component';
import { TreeViewModule } from '../lazy-loaded-tree-view/tree-view.module';
import { ModalModule } from '../ng2-bs3-modal/ng2-bs3-modal.module';
import { AllowedValueService } from './allowed-value.service';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CoreEstService } from './core-est.service';
import { NodeSelectorService } from './node-selector.service';
import { PagerModule } from '../pager/pager.module';
import { TreeToolbarComponent } from './tree-toolbar.component';
import { Uppercase } from './uppercase.directive';

@NgModule({
  imports: [ CoreModule,
              FillBomRoutingModule,
              TreeViewModule,
              ModalModule,
              ToasterModule,
              SharedModule,
              PagerModule,
              GridModule ],
  declarations: [ PositionsListComponent,
                  AddPositionComponent,
                  FillBomComponent,
                  TreeToolbarComponent,
                  Uppercase ],
  exports: [ PositionsListComponent,
              AddPositionComponent ],
  providers: [ CoreEstService,
                CommodityGroupService,
                CommodityGroupStoreService,
                CommodityPartService,
                CommodityPartStoreService,
                MaterialStoreService,
                MaterialService,
                PositionService,
                PositionStoreService,
                CommodityTableService,
                CommodityTableStoreService,
                CommodityTableValueService,
                CommodityTableValueStoreService,
                AttributeStoreService,
                AttributeService,
                AllowedValueService,
                ToasterService,
                NodeSelectorService ]
})
export class FillBomModule {
  constructor () {
  }
}
