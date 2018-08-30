import { TreeNode } from './tree-node';

export const treeNodeReducerSingle = (node: any) => {
  if (node) {
      return new TreeNode(node.id, node.url, node.name, node.nodeType, node.idFather,
        node.locked, node.lockedBy, node.hasPositions, node.lockedWbs, node.commodityGroup, node.commodityPart);
    }
    return new TreeNode(0, '/Oratrios.Api/api/Nodest/0/nodes.json', 'Project', 'project', 0, false, '', false, null, null, null);
};
