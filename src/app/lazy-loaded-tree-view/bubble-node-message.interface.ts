import { TreeNode } from './tree-node';
import { NodeAction } from '../core/node-action';

export interface BubbleNodeMessageInterface {
  root: TreeNode;
  bubbleNodeMessage(action: string, callingView: BubbleNodeMessageInterface, parentView: BubbleNodeMessageInterface): void;
  refreshCurrentNode(modifiedChildNode: boolean, modifiedAction: NodeAction): void;
}
