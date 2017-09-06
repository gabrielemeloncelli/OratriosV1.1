import {
  ModuleWithProviders,
  NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ElectricalProjectRootComponent } from './electrical-project-root';
import { TreeViewComponent } from './tree-view';
import { TreeNode } from './tree-node';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports:      [ CommonModule, HttpModule, FormsModule ],
  declarations: [ TreeViewComponent, ElectricalProjectRootComponent ],
  exports:      [ TreeViewComponent, ElectricalProjectRootComponent ],
  providers:    [ HttpModule, FormsModule ]
})

export class TreeViewModule {}
