import { TreeNode } from './tree-node';

export const treeNodeReducer = (state: any[]) => {
      return state.map((n: any) => {
        return new TreeNode(n.id, n.url, n.name, n.nodeType, n.idFather,
          n.locked, n.lockedBy, n.hasPositions, n.lockedWbs, n.commodityGroup, n.commodityPart);
      });
};
