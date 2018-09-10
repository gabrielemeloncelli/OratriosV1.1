import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';

import { TreeNode } from '../lazy-loaded-tree-view/tree-node';
import { UiStatusService } from '../core/ui-status.service';
import { TreeNodeService } from '../core/tree-node.service';
import { NodePositionsUpdate } from '../core/node-positions-update';

@Component({
    templateUrl: 'tree-toolbar.component.html',
    selector: 'mbe-tree-toolbar'
})
export class TreeToolbarComponent {
    @Input() selectedNode: TreeNode;
    @Output() pasting = new EventEmitter<boolean>();
    constructor(private uiStatusService: UiStatusService,
    private treeNodeService: TreeNodeService) { }
    public pastingFlag = false;
    public pasteButtonLabel = "Paste node tree";

    ngOnInit() {
        this.treeNodeService.nodePositionsUpdate.subscribe(
            nodePositionUpdate => this.nodePositionUpdated(nodePositionUpdate)
        );
    }

    canPasteTree(): boolean {
        return !this.pastingFlag && !!this.selectedNode && !!this.uiStatusService.nodeTreeToBeCopied;
    }

    copyNodeTree() {
        this.uiStatusService.nodeTreeToBeCopied = this.selectedNode;
    }

    copyPastedNodeTree() {
        this.pastingFlag = true;
        this.pasting.emit(this.pastingFlag);
        this.pasteButtonLabel = "Pasting ...";
        this.treeNodeService.copyNodeTree(this.uiStatusService.nodeTreeToBeCopied.id, this.selectedNode.id);
        this.uiStatusService.nodeTreeToBeCopied = null;
    }

    nodePositionUpdated(update){
        this.pastingFlag = false;
        this.pasting.emit(this.pastingFlag);
        this.pasteButtonLabel = "Paste node tree";
    }
}
