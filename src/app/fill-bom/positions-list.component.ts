import {
  Component,
  ViewChild }               from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { BomPosition }          from './bom-position';
import { NodeSelectorService }  from './node-selector.service';
import { TreeNode }             from '../lazy-loaded-tree-view/tree-node';
import { PositionService }      from './position.service';
import { UiStatusService }      from '../core/ui-status.service';
import { CommodityGroup }       from './commodity-group';
import { CommodityPart }        from './commodity-part';
import { ModalComponent }       from '../ng2-bs3-modal/components/modal';



@Component({
  selector: "positions-list",
  templateUrl: "positions-list.component.html",
  styleUrls: ["positions-list.component.css"]
})
export class PositionsListComponent {
  public nodeName: string;
  public nodeLocked: boolean;
  private _node: TreeNode;
  @ViewChild(ModalComponent)
  confirmModal: ModalComponent;
  private _positionToBeDeleted: BomPosition;
  public loadingVisible = false;
  public selectedNodePath: string;
  private deletionAction: string;
  private DELETION_NODE_QUANTITIES = "DELETION_NODE_QUANTITIES";
  private DELETION_POSITION = "DELETION_POSITION";
  public positionsCount = 0;
  private _currentPage = 0;
  public gridData: BomPosition[];


  constructor(private selectorService: NodeSelectorService, public positionsService: PositionService, private uiStatusService: UiStatusService) {
  }

  ngOnInit() {
    this.nodeName = '-';
    this.nodeLocked = true;
    this.selectorService.selectedNode.subscribe(
      (selectedNode: TreeNode) => { this.updateSelection(selectedNode); }
    );
    this.selectorService.selectedNodePath.subscribe(
      (path: string) => {
        this.selectedNodePath = path;
        this.uiStatusService.nodePath = path;
      }
    )
    this.positionsService.positions.subscribe(positions => {
      this.loadingVisible = false;
      this.gridData = positions;
    });

    this.positionsService.positionsCount.subscribe(positionsCount => {
      this.positionsCount = positionsCount;
      if (this.positionsCount === 0)
      {
        this.loadingVisible = false;
      }
    });
  }

  editPosition(position: BomPosition) {
    this.uiStatusService.editPosition(position);
  }

  deletePosition(position: BomPosition) {
    this._positionToBeDeleted = position;
    this.deletionAction = this.DELETION_POSITION;
    this.askForConfirmationDeletion();
  }

  updateSelection(selectedNode: TreeNode): void {
    this._node = selectedNode;
    this.nodeName = this._node.name;
    this.nodeLocked = selectedNode.locked;
    this.uiStatusService.commodityGroup = !selectedNode.commodityGroup ? new CommodityGroup(0, "", "") : selectedNode.commodityGroup;
    console.log("position-list.component - updateSelection - !!this.uiStatusService.commodityGroup.id: " + this.uiStatusService.commodityGroup.id); //TODO: remove
    this.uiStatusService.commodityPart = !selectedNode.commodityPart ? new CommodityPart(0, "", "", this.uiStatusService.commodityGroup.code) : selectedNode.commodityPart;
    console.log("position-list.component - updateSelection - !!this.uiStatusService.commodityPart.id: " + this.uiStatusService.commodityPart.id); //TODO: remove
    this.positionsService.selectNode(selectedNode.id);
    this.uiStatusService.updateNodePositions(selectedNode.id);
    this.onPageChanged(this._currentPage);

  }
  addCatalogItem(hideTag: boolean) {
    this.uiStatusService.setInsertPosition(true, false, hideTag);
  }

  addTagItem() {
    this.uiStatusService.setInsertPosition(true, true, false);
  }

  askForConfirmationDeletion() {
    this.confirmModal.open('sm');
  }

  clearNode() {
    this.deletionAction = this.DELETION_NODE_QUANTITIES;
    this.askForConfirmationDeletion();
  }

  confirmDeletion() {
    this.confirmModal.dismiss();
    console.log("positions-list.component -- confirmDeletion -- this.deletionAction: " + this.deletionAction); //TODO: remove
    if (this.deletionAction === this.DELETION_POSITION) {
      console.log("positions-list.component -- confirmDeletion -- deletePosition -- !!this._positionToBeDeleted: " + !!this._positionToBeDeleted); //TODO: remove
      this.positionsService.deletePosition(this._positionToBeDeleted).subscribe(p => { this.updateSelection(this._node) });
    }
    if (this.deletionAction === this.DELETION_NODE_QUANTITIES) {
      console.log("positions-list.component -- confirmDeletion -- clearNode -- this._node.id: " + this._node.id); //TODO: remove
      this.positionsService.clearNode(this._node.id).subscribe(() => { this.updateSelection(this._node) });
    }
  }
  refreshList() {
    this.updateSelection(this._node);
  }

  copyNodeContents() {
    this.uiStatusService.nodeToBeCopied = this._node;
  }

  canPaste(): boolean {
    if (!this.uiStatusService.nodeToBeCopied) {
      return false;
    }
    if (!this._node.commodityPart || !this._node.commodityPart.id)
    {
      return true;
    }
    if(!this.uiStatusService.nodeToBeCopied.commodityPart) {
      return false;
    }
    return this.uiStatusService.nodeToBeCopied.commodityPart.id === this._node.commodityPart.id;
  }

  copyPastedContents() {
    this.positionsService.pasteNode(this.uiStatusService.nodeToBeCopied.id, this._node.id)
    .subscribe(() => { this.updateSelection(this._node) });
  }

  onPageChanged(pageChanged: number) {
    this.loadingVisible = true;
    this._currentPage = pageChanged;
    this.positionsService.selectPage(this._node.id, pageChanged, 50);
    console.log('position-list.component -- onPageChanged -- pageSelected :' + pageChanged); //TODO: replace
  }

}
