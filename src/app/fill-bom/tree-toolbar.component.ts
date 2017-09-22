import {
    Component,
    Input
} from '@angular/core';

import { TreeNode } from '../lazy-loaded-tree-view/tree-node';
import { UiStatusService } from '../core/ui-status.service';
import { TreeNodeService } from '../core/tree-node.service';

@Component({
    templateUrl: 'tree-toolbar.component.html',
    selector: 'mbe-tree-toolbar'
})
export class TreeToolbarComponent {
    @Input() selectedNode: TreeNode;
    constructor(private uiStatusService: UiStatusService,
    private treeNodeService: TreeNodeService) { }

    canPasteTree(): boolean {
        return !!this.selectedNode && !!this.uiStatusService.nodeTreeToBeCopied;
    }

    copyNodeTree() {
        this.uiStatusService.nodeTreeToBeCopied = this.selectedNode;
    }

    copyPastedNodeTree() {
        this.treeNodeService.copyNodeTree(this.uiStatusService.nodeTreeToBeCopied.id, this.selectedNode.id);
        this.uiStatusService.nodeTreeToBeCopied = null;
    }
}
