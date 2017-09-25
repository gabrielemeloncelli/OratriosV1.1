import {Component, Input, OnInit} from '@angular/core';
import {TreeViewComponent} from './tree-view';
import {TreeNode} from './tree-node';
import {TreeNodeService} from '../core/tree-node.service';
import {BubbleNodeMessageInterface} from './bubble-node-message.interface';
import { UiStatusService } from '../core/ui-status.service';

@Component({
  selector: 'mbe-tree-viewx',
  template: `<mbe-tree-view [root]="root" [message]="outMessage" [parentView]="currentView"></mbe-tree-view>`
})

export class ElectricalProjectRootComponent implements OnInit, BubbleNodeMessageInterface {
  @Input() message: any;
  outMessage: any;
  PromiseConstructor: TreeNode;
  root: TreeNode;
  currentView: any;

  constructor(private _treeNodeService: TreeNodeService, private _uiStatusService: UiStatusService) {
    this.root  = new TreeNode(0, 'api/Nodest/0/nodes.json', 'Project ' + _uiStatusService.projectCode + ' - '
    + _uiStatusService.disciplineCode, 'project', 0, false, '', false, null, null);
    this.root.toggleExpansion();
  }

  ngOnInit() {
    this.outMessage = this;
    this.currentView = this;
  }

  bubbleNodeMessage(action: string, callingView: BubbleNodeMessageInterface, parentView: BubbleNodeMessageInterface) {
    this.message.bubbleNodeMessage(action, callingView, parentView);
  }

  refreshCurrentNode(modifiedChildNode: boolean): void {
    if (modifiedChildNode) {
      this.refreshChildNodes();
    }
  }

  refreshChildNodes() {
    // Expand the root to refresh the calculated values
    this.root.toggleExpansion();
    setTimeout(() => { this.root.toggleExpansion(); }, 500);
  }

}
