import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Option } from 'ng-select/dist/option';
import { SelectComponent } from 'ng-select/dist/select.component';

import { BubbleNodeMessageInterface } from '../lazy-loaded-tree-view/bubble-node-message.interface';
import { TreeNode } from '../lazy-loaded-tree-view/tree-node';
import { TreeNodeService } from '../core/tree-node.service';
import { CoreEstService } from './core-est.service';
import { UiStatusService } from '../core/ui-status.service';
import { CommodityGroupService } from './commodity-group.service';
import { CommodityPartService } from './commodity-part.service';
import { ModalComponent } from '../ng2-bs3-modal/components/modal';
import { NodeDTO } from '../lazy-loaded-tree-view/nodeDTO';
import { NodeType } from '../core/node-type';
import { CommodityGroup } from './commodity-group';
import { CommodityPart } from './commodity-part';
import { NodeSelectorService } from './node-selector.service';

declare let jQuery: any;


@Component({
  templateUrl: 'fill-bom.component.html',
  styleUrls: ['fill-bom.component.css'],
  selector: 'mbe-fill-bom'
})
export class FillBomComponent implements BubbleNodeMessageInterface, OnInit {
  outMessage = this;
  confirmButtonText = 'Add';
  actionType = '';
  eventNodeView: BubbleNodeMessageInterface = null;
  eventNode: TreeNode = null;
  eventParentNodeView: BubbleNodeMessageInterface = null;
  treeNodeService: TreeNodeService;
  root: TreeNode = null;
  nodeTypes: NodeType[];
  coreService: any;
  coreEstService: CoreEstService;
  positionAdd = false;
  positionIsTag = false;
  conflictDetected = false;
  canConfirmConflict = false;
  warningMessage = '';
  nodeTypeOptions: Option[];
  @ViewChild('nodeTypeSelector')
  nodeSelectorComponent: SelectComponent;
  nodeTypeChangeDisabled: boolean;
  nodeSelectorPlaceholder: string;
  nameIsPullDown: boolean;
  nodeNameOptions: Option[];
  commodityGroups: CommodityGroup[] = new Array<CommodityGroup>();
  commodityParts: CommodityPart[] = new Array<CommodityPart>();
  changedNode = new TreeNode(0, '', '', '', 0, false, '', false, null, null);
  private value: any = {};
  private nodeNameDisabled = false;

  constructor(treeNodeService: TreeNodeService, coreEstService: CoreEstService,
    private uiStatusService: UiStatusService, private commodityGroupService: CommodityGroupService,
    private router: Router, private commodityPartService: CommodityPartService,
    private selectorService: NodeSelectorService) {
    this.treeNodeService = treeNodeService;
    this.coreEstService = coreEstService;
  }

  @ViewChild('navigateModal')
  modalComponent: ModalComponent;



  handleNode(): void {
    this.conflictDetected = false;
    this.canConfirmConflict = false;
    this.warningMessage = '';
    this.confirmButtonText = 'Add';
    this.nodeNameDisabled = false;
    this.nodeTypeChangeDisabled = false;
    this.nameIsPullDown = false;

    if (!!this.nodeSelectorComponent) {
      if (!!this.nodeSelectorComponent.value) {
        this.nodeSelectorComponent.clear();
      }
    }

  }


  addChildNode(): void {
    this.actionType = 'add';
    this.changedNode = new TreeNode(0, '', '', '', this.eventNode.id, false, '', false, null, null);
    this.handleNode();
    if (this.eventNode && !!this.eventNode.commodityGroup && !this.eventNode.commodityPart) {
      this.changedNode.commodityGroup = this.eventNode.commodityGroup;
      this.changedNode.type = this.uiStatusService.PART_CODE;
      this.nodeTypeChangeDisabled = true;
      this.nameIsPullDown = true;
      this.nodeNameOptions = new Array<Option>();
      if (this.eventNode && this.eventNode.commodityGroup) {
        this.commodityPartService.getAll(this.eventNode.commodityGroup.id);
      }
    }
    this.modalComponent.open();

  }

  editNode(): void {
    this.actionType = 'edit';
    this.changedNode = new TreeNode(this.eventNode.id,
      this.eventNode.url,
      this.eventNode.name,
      this.eventNode.type,
      this.eventNode.idFather,
      this.eventNode.locked,
      this.eventNode.lockedBy,
      this.eventNode.hasPositions,
      this.eventNode.commodityGroup,
      this.eventNode.commodityPart);
    this.handleNode();
    this.nodeTypeChangeDisabled = !!this.changedNode.commodityGroup || !!this.changedNode.commodityPart;
    this.confirmButtonText = 'Save';
    this.modalComponent.open();
  }

  deleteNode(): void {
    this.actionType = 'delete';
    this.changedNode = this.eventNode;
    this.handleNode();
    this.confirmButtonText = 'Delete';
    this.modalComponent.open();
    this.nodeNameDisabled = true;
    this.nodeTypeChangeDisabled = true;
  }

  toggleLockNode(): void {
    this.actionType = 'togglelock';
    this.changedNode = this.eventNode;
    this.handleNode();
    this.changedNode.locked = !this.eventNode.locked;
    this.storeNode();
  }

  createNodeTypeOptions(): Option[] {
    const result = new Array<Option>();
    for (const loopNodeType of this.nodeTypes) {
      if (loopNodeType.code !== this.uiStatusService.PART_CODE) {
        result.push(new Option({
          value: loopNodeType.code,
          label: loopNodeType.code + ' - ' + loopNodeType.description
        }));
      }
    }
    return result;
  }

  createPartNameOptions(parts: CommodityPart[]): Option[] {
    this.commodityParts = parts;
    return parts.map(p => new Option({
      value: p.id.toString(),
      label: p.code + ' - ' + p.description
    }));
  }

  createGroupNameOptions(): Option[] {
    return this.commodityGroups.map(g => new Option({
      value: g.id.toString(),
      label: g.code + ' - ' + g.description
    }));
  }





  ngOnInit() {
    this.commodityGroupService.getAll(this.uiStatusService.disciplineId);





    this.uiStatusService.insertPosition.subscribe(
      details => {
        this.positionAdd = details.displayInsertPosition;
        this.positionIsTag = details.positionFromTag;
      }
    );
    this.uiStatusService.editPositionObservable.subscribe(
      position => {
        this.positionAdd = true;
        if (position) {
          this.positionIsTag = position.isTwm;
        } else {
          this.positionIsTag = false;
        }
      }
    );
    setTimeout(() => {
      this.nodeTypes = this.uiStatusService.nodeTypes;
      this.nodeTypeOptions = this.createNodeTypeOptions();
    }
      , 1000);

    this.nodeSelectorPlaceholder = 'Select / Change node type';
    this.commodityGroupService.groups.subscribe(g => this.commodityGroups = g);
    this.commodityPartService.parts.subscribe(p => this.nodeNameOptions = this.createPartNameOptions(p));

    this.selectorService.selectedNodePath.subscribe(
      (path: string) => this.windowResized()
    );

    this.windowResized();
    this.trimSize();

  }

  tryStoreNode(): void {
    return this.baseStoreNode(false);
  }

  storeNodeConfirm(): void {
    return this.baseStoreNode(true);
  }

  baseStoreNode(forceDifferentType: boolean): void {
    const newNode = this.createNodeDTO();
    newNode.forceDifferentType = forceDifferentType;
    const action = this.createNodeAction(newNode);
    if (action.name) {
      this.treeNodeService.persistNode(action)
        .subscribe(
        () => {
          this.refreshTree();
          this.modalComponent.dismiss();
        },
        error => {
          if (error.status && error.status === 409) {
            this.warningMessage = error.message;
            this.conflictDetected = true;
            let stringMessage: string = error.message.toString();
            if (stringMessage.length >= 61) {
              stringMessage = stringMessage.substring(0, 61);
            }
            this.canConfirmConflict = stringMessage === 'The following node type(s) are already present in the branch:';
          }
        });
    }
  }

  storeNode(): void {
    const newNode = this.createNodeDTO();
    const action = this.createNodeAction(newNode);
    if (action.name) {
      this.treeNodeService.persistNode(action)
        .subscribe(() => { this.refreshTree(); });
    }
  }

  private createNodeDTO(): NodeDTO {

    const newNode: NodeDTO = new NodeDTO();
    newNode.id = 0;
    newNode.nodeType = this.changedNode.type;
    newNode.name = this.changedNode.name;
    newNode.locked = this.changedNode.locked;
    newNode.lockedBy = this.uiStatusService.userCode;
    newNode.idFather = this.changedNode.idFather;
    newNode.url = 'api/Nodes/' + newNode.id;
    newNode.commodityGroup = this.changedNode.commodityGroup;
    newNode.commodityPart = this.changedNode.commodityPart;
    newNode.projectDisciplineId = this.uiStatusService.projectDisciplineId;

    return newNode;
  }

  private createNodeAction(newNode: NodeDTO): any {
    let action: any;
    action = { name: null, url: 'api/Nodes/' + this.eventNode.id.toString(), node: newNode };
    switch (this.actionType) {
      case 'add':
        newNode.id = 0;
        newNode.url = 'api/Nodes/' + newNode.id;
        newNode.idFather = this.eventNode.id;
        action.name = 'STORE_NODE';
        action.url = 'api/Nodes';
        break;
      case 'edit':
      case 'togglelock':
        action.name = 'EDIT_NODE';
        break;
      case 'delete':
        action.name = 'DELETE_NODE';
        break;
    }
    return action;
  }

  bubbleNodeMessage(action: string, callingView: BubbleNodeMessageInterface, parentView: BubbleNodeMessageInterface) {
    this.eventNodeView = callingView;
    this.eventParentNodeView = parentView;
    this.eventNode = callingView.root;
    switch (action) {
      case 'add':
        this.addChildNode();
        break;
      case 'delete':
        this.deleteNode();
        break;
      case 'edit':
        this.editNode();
        break;
      case 'togglelock':
        this.toggleLockNode();
        break;
    }

  }

  refreshTree() {
    switch (this.actionType) {
      case 'add':
        this.eventNodeView.refreshCurrentNode(true);
        break;
      case 'delete':
        this.eventParentNodeView.refreshCurrentNode(true);
        break;
      case 'edit':
      case 'togglelock':
        this.eventNodeView.refreshCurrentNode(false);
        break;
    }

  }

  refreshChildNodes(): void { }

  refreshCurrentNode(modifiedChildNode: boolean): void { }

  public exportFile() {
    this.router.navigate(['/export']);
  }

  public exportOmiFile() {
    window.location.replace('api/export/omi/' + this.uiStatusService.projectDisciplineId);
  }

  public exportExcelPositions() {
    window.location.replace('api/export/excelpositions/' + this.uiStatusService.projectDisciplineId);
  }

  public exportExcelTree() {
    window.location.replace('api/export/exceltree/' + this.uiStatusService.projectDisciplineId);
  }



  public nodeTypeSelected(value: Option): void {
    this.changedNode.type = value.value;
    this.nameIsPullDown = false;
    if (this.changedNode.type === this.uiStatusService.GROUP_CODE) {
      this.nameIsPullDown = true;
      this.nodeNameOptions = this.createGroupNameOptions();
    } else {
      this.changedNode.commodityGroup = null;
      this.changedNode.commodityPart = null;
    }
  }

  public nodeNameSelected(value: Option): void {
    this.changedNode.name = this.selectGroupOrPart(+value.value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  private selectGroupOrPart(entityId: number): string {
    let entityCode = '';
    const useGroup = (!!this.eventNode.commodityGroup && !this.eventNode.commodityPart && this.actionType === 'add')
      || (!!this.eventNode.commodityGroup && !!this.eventNode.commodityPart && this.actionType === 'edit');
    if (useGroup) {
      const filteredPart = this.commodityParts.filter(p => p.id === entityId);
      if (filteredPart.length > 0) {
        entityCode = filteredPart[0].code;
        this.changedNode.commodityPart = filteredPart[0];
      }
    } else {
      const filteredGroup = this.commodityGroups.filter(g => g.id === entityId);
      if (filteredGroup.length > 0) {
        entityCode = filteredGroup[0].code;
        this.changedNode.commodityGroup = filteredGroup[0];
      }
    }

    return entityCode;
  }

  trimSize() {
    window.addEventListener('resize', this.windowResized);
  }

  windowResized() {
    let column = document.getElementById('main-fill-bom-col-1');
    if (!!column) {
      column.style.maxHeight = (window.innerHeight - 180).toString() + 'px';
    }
    column = document.getElementById('main-fill-bom-col-2');
    if (!!column) {
      column.style.maxHeight = (window.innerHeight - 240).toString() + 'px';
    }
    const grid = document.getElementById('kg-positions');
    if (!!grid) {
      grid.style.height = (window.innerHeight - 241).toString() + 'px';
    }
    // Get the scrolling part of the grid
    const gridContent = jQuery('#kg-positions div.k-grid-content');
    console.log('fill-bom.component -- windowResized -- !!gridContent[0]: ' + !!gridContent[0]); // TODO: remove
    if (!!gridContent[0]) {
      const lockedGridContent = jQuery('#kg-positions div.k-grid-content-locked');
      lockedGridContent[0].style.height = gridContent[0].clientHeight.toString() + 'px';
    }
  }

}
