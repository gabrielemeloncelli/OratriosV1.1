import {Component, Input, OnInit} from '@angular/core';
import {TreeView} from './tree-view';
import {TreeNode} from './tree-node';
import {TreeNodeService} from '../core/tree-node.service';
import {BubbleNodeMessageInterface} from './bubble-node-message.interface';
import { UiStatusService } from '../core/ui-status.service';

@Component({
  selector:'tree-viewx',
  template:`<tree-view [root]="root" [message]="outMessage" [parentView]="currentView"></tree-view>`
})

export class ElectricalProjectRoot implements OnInit, BubbleNodeMessageInterface{
  @Input() message: any;
  outMessage: any;
  PromiseConstructor: TreeNode;
  root: TreeNode;
  currentView: any;

  constructor(private _treeNodeService:TreeNodeService, private _uiStatusService: UiStatusService){
    this.root  = new TreeNode(0, 'api/Nodest/0/nodes.json', 'Project ' + _uiStatusService.projectCode + ' - '
    + _uiStatusService.disciplineCode, 'project', 0, false, "", false, null, null);
    this.root.expand();
  }

  ngOnInit(){
    this.outMessage = this;
    this.currentView = this;
  }

  bubbleNodeMessage(action: string, callingView: BubbleNodeMessageInterface, parentView: BubbleNodeMessageInterface)
  {
    this.message.bubbleNodeMessage(action, callingView, parentView);
  }

  refreshCurrentNode(modifiedChildNode : boolean) : void
  {
    if (modifiedChildNode)
    {
      this.refreshChildNodes();
    }
  }

  refreshChildNodes()
  {
    // Expand the root to refresh the calculated values
    this.root.expand();
    setTimeout(() => {this.root.expand();}, 500);
  }

}
