import { TreeNode } from './tree-node';

export interface BubbleNodeMessageInterface
{
  root: TreeNode;
  bubbleNodeMessage(action : string, callingView : BubbleNodeMessageInterface, parentView : BubbleNodeMessageInterface) : void;
  refreshCurrentNode(modifiedChildNode : boolean) : void;

}
