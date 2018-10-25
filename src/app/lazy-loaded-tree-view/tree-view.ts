import {
    Component,
    Input,
    OnInit
} from '@angular/core';

import { TreeNode } from './tree-node';
import { TreeNodeService } from '../core/tree-node.service';
import { BubbleNodeMessageInterface } from './bubble-node-message.interface';
import { NodeSelectorService } from '../fill-bom/node-selector.service';
import { UiStatusService } from '../core/ui-status.service';
import { NodePositionsUpdate } from '../core/node-positions-update';
import { NodeAction } from '../core/node-action';
import { analyzeAndValidateNgModules } from '@angular/compiler';


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

    refreshCurrentNode(modifiedChildNode: boolean, action: NodeAction): void {
        this.treeNodeService.getSingleNode(this.root.id)
            .subscribe((r: any) => {
                this.root.url = r.url;
                this.root.refreshCss();
                // Refresh icons by toggling twice the expansion
                //this.root.toggleExpansion();
                //this.root.toggleExpansion();
                if (this.root.id > 0) {
                    this.root.name = r.name;
                    this.root.type = r.type;
                    this.root.locked = r.locked;
                    this.root.lockedBy = r.lockedBy;
                }
                if (modifiedChildNode) {
                    if (!this.root.expanded) {
                        this.root.toggleExpansion();
                    }
                    //this.root.toggleExpansion();
                    this.refreshChildNodes(action);
                }
            });
    }

    refreshChildNodes(action: NodeAction): void {
        if (this.root.url) {
            this.treeNodeService.fetchTreeNodes(this.root.id, this.uiStatusService.projectDisciplineId)
                .subscribe((r: any) => { this.mergeItems(r, action); });
        } else {
            this.items = null;
        }
        // Expand the root to refresh the calculated values
        //this.root.toggleExpansion();
        this.root.refreshCss();
        //setTimeout(() => { this.root.toggleExpansion(); }, 500);
    }

    mergeItems(retrievedItems: any[], action: NodeAction): void {
        if (action.name == 'DELETE_NODE') {
            let survivedItems: any[] = this.removeMissingItems(retrievedItems);
            this.items = survivedItems;
        } else if (action.name == 'STORE_NODE') {
            let integratedItems: any[] = this.integrateNewItems(retrievedItems);
            this.items = integratedItems;
        } else if (action.name == 'EDIT_NODE') {
            let integratedItems: any[] = this.integrateModifiedItems(retrievedItems, action);
            this.items = integratedItems;
        }
    }

    removeMissingItems(retrievedItems: any[]): any[] {
        let survivedItems: any[] = new Array<any>();
        this.items.forEach(element => {
            let found = false;
            retrievedItems.forEach(item => {
                if (element.id == item.id) {
                    found = true;
                }
            });
            if (found) {
                survivedItems.push(element);
            }
        });

        return survivedItems;
    }

    integrateNewItems(retrievedItems: any[]): any[] {
        let integratedItems: any[] = new Array<any>();
        let currentItems: any[];
        let newItem: any[];
        let addedElements: any[] = new Array<any>();
        // TODO: Remove
        console.log("TreeView.component -- integrateNewItems -- original count: " + this.items.length.toString());
        retrievedItems.forEach(element => {
            let found = false;
            this.items.forEach(item => {
                // TODO: Remove
                console.log("TreeView.component -- integrateNewItems -- element.id: " + element.id.toString());
                console.log("TreeView.component -- integrateNewItems -- item.id: " + item.id.toString());
                if (element.id == item.id) {
                    found = true;
                }
            });
            if (!found) {
                addedElements.push(element);
            }
        });
        // TODO: Remove
        console.log("TreeView.component -- integrateNewItems -- addedElements.length: " + addedElements.length.toString());
        if (addedElements.length == 0) {
            return this.items;
        } 
        currentItems = this.items;
        integratedItems = new Array<any>();
        addedElements.forEach(addedElement => {
            let added = false;
            currentItems.forEach(element => {
                if (element.name > addedElement.name) {
                    if (!added) {
                        integratedItems.push(addedElement);
                        added = true;
                    }                   
                }
                integratedItems.push(element);
            });
            if (!added) {
                integratedItems.push(addedElement);
            }
            currentItems = integratedItems;
            integratedItems = new Array<any>();
    
        });

        return currentItems;
    }

    integrateModifiedItems(retrievedItems: any[], action: NodeAction): any[] {
        let integratedItems: any[] = new Array<any>();
        let newItem: any[];
        let modifiedElement: any = null;
        retrievedItems.forEach(element => {
            let found = false;
            this.items.forEach(item => {
                if (element.id == action.node.id) {
                    found = true;
                }
            });
            if (!found) {
                modifiedElement = element;
            }
        });
        if (modifiedElement == null) {
            return this.items;
        }
        this.items.forEach(element => {
            if (element.id == modifiedElement.id) {
                integratedItems.push(modifiedElement);
            } else {
                integratedItems.push(element);
            }
        });


        return integratedItems;
    }

    ngOnInit() {
        this.outMessage = this;
        if (this.root.expanded) {
            this.refreshChildNodes(new NodeAction('STORE_NODE', '', null));
        }

        this.uiStatusService.nodePositionsUpdate.subscribe(
            (upd: NodePositionsUpdate) => {
                if (upd.id === this.root.id) {
                    this.root.hasPositions = upd.hasPositions;
                    this.root.lockedWbs = upd.lockedWbs;
                    if (upd.refreshNode) {
                        this.refreshCurrentNode(true, new NodeAction('STORE_NODE', '', null));
                    }
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
            this.refreshChildNodes(new NodeAction('STORE_NODE', '', null));
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
            .subscribe(() => { this.refreshChildNodes(action); });
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
