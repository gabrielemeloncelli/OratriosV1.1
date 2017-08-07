"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tree_node_1 = require("./tree-node");
exports.treeNodeReducerSingle = function (node) {
    if (node) {
        return new tree_node_1.TreeNode(node.id, node.url, node.name, node.nodeType, node.idFather, node.locked, node.lockedBy, node.hasPositions, node.commodityGroup, node.commodityPart);
    }
    return new tree_node_1.TreeNode(0, 'api/Nodest/0/nodes.json', 'Project', 'project', 0, false, '', false, null, null);
};
//# sourceMappingURL=tree-node-reducer-single.js.map