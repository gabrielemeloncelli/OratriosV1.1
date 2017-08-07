/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule}       from '@angular/core';

import { CommonModule }      from '@angular/common';
import { ElectricalProjectRoot } from './electrical-project-root';
import { TreeView } from './tree-view';
import { TreeNode } from './tree-node';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports:      [ CommonModule, HttpModule, FormsModule ],
  declarations: [ TreeView, ElectricalProjectRoot ],
  exports:      [ TreeView, ElectricalProjectRoot ],
  providers:    [ HttpModule, FormsModule ]
})

export class TreeViewModule {

};
