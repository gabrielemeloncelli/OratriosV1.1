import {
  Component,
  Input,
  OnInit } from '@angular/core';

import { TreeNode } from './tree-node';
import { TreeNodeService } from '../core/tree-node.service';
import { BubbleNodeMessageInterface } from './bubble-node-message.interface';
import { NodeSelectorService } from '../fill-bom/node-selector.service';
import { UiStatusService } from '../core/ui-status.service';
import { NodePositionsUpdate } from '../core/node-positions-update';


@Component({
  templateUrl: 'tree-view.html',
  styleUrls: ['tree-view.css'],
  selector: 'mbe-tree-view',
})
export class TreeViewComponent implements OnInit, BubbleNodeMessageInterface {
  @Input() root: TreeNode;
  children: any;
  items: any[] = [];
  @Input() message: any;
  @Input() parentView: any;
  currentView: any;
  outMessage: any;
  public isSelected = false;



  constructor(private treeNodeService: TreeNodeService, private selectorService: NodeSelectorService,
    private uiStatusService: UiStatusService) {
    this.currentView = this;
  }

  refreshCurrentNode(modifiedChildNode: boolean): void {
    this.treeNodeService.getSingleNode(this.root.id)
      .subscribe((r: any) => {
        this.root.url = r.url;
        this.root.hasPositions = !!this.root.url;
        // Refresh icons by toggling twice the expansion
        this.root.toggleExpansion();
        this.root.toggleExpansion();
        if (this.root.id > 0) {
          this.root.name = r.name;
          this.root.type = r.type;
          this.root.locked = r.locked;
          this.root.lockedBy = r.lockedBy;
        }
        if (modifiedChildNode) {
          if (this.root.expanded) {
            this.root.toggleExpansion();
          }
          this.root.toggleExpansion();
          this.refreshChildNodes();
        }
      });
  }

  refreshChildNodes(): void {
    if (this.root.url) {
      this.treeNodeService.fetchTreeNodes(this.root.id, this.uiStatusService.projectDisciplineId)
        .subscribe((r: any) => { this.items = r; });
    } else {
      this.items = null;
    }
    // Expand the root to refresh the calculated values
    this.root.toggleExpansion();
    setTimeout(() => { this.root.toggleExpansion(); }, 500);
  }

  ngOnInit() {
    this.outMessage = this;
    if (this.root.expanded) {
      this.refreshChildNodes();
    }

    this.uiStatusService.nodePositionsUpdate.subscribe(
      (upd: NodePositionsUpdate) => {
        if (upd.id === this.root.id) {
          this.root.hasPositions = upd.hasPositions;
        }
      }
    );

    this.selectorService.selectedNode.subscribe(
      (node: TreeNode) => {
        this.isSelected = this.root.id === node.id;
      }
    );
  }

  public get enabled(): boolean {
    if (!this.uiStatusService.userCode) {
      return false;
    }
    if (this.uiStatusService.userIsAdministrator) {
      return true;
    }
    if (!!this.root && this.uiStatusService.userCode === this.root.lockedBy) {
      return true;
    }
    return false;
  }

  public get lockClasses(): string {
    {
      if (this.root.locked) {
        if (this.enabled) {
          return 'btn btn-warning btn-xs pull-right';
        } else {
          return 'btn btn-danger btn-xs pull-right';
        }
      } else {
        return 'btn btn-success btn-xs pull-right';
      }

    }
  }

  expand(): void {
    this.root.toggleExpansion();
    if (this.root.expanded === true) {
      this.refreshChildNodes();
    }
  }


  addNode() {
    this.bubbleNodeMessage('add', this, this.parentView);
  }

  bubbleNodeMessage(action: string, callingView: BubbleNodeMessageInterface, parentView: BubbleNodeMessageInterface) {
    this.message.bubbleNodeMessage(action, callingView, parentView);
  }

  editNode() {
    this.bubbleNodeMessage('edit', this, this.parentView);
  }

  deleteNode() {
    this.bubbleNodeMessage('delete', this, this.parentView);
  }

  persistNode(action: any) {
    this.treeNodeService.persistNode(action)
      .subscribe(() => { this.refreshChildNodes(); });
  }

  toggleLockNode() {
    this.bubbleNodeMessage('togglelock', this, this.parentView);
  }

  selectRoot() {
    if (this.root.id > 0) {
      this.selectorService.selectNode(this.root);
    }
  }

  canEdit(): boolean {
    if (!(this.root.id !== 0 && this.uiStatusService.userIsAdministrator)) {
      return false;
    }
    if (!!this.root.commodityPart) { // && this.root.hasPositions) {
      return false;
    }
    if (!!this.root.commodityGroup && !this.root.commodityPart) { // && !!this.root.url) {
      return false;
    }
    return true;
  }

}
