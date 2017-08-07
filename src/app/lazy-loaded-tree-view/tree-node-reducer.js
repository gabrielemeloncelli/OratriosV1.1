"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tree_node_1 = require("./tree-node");
exports.treeNodeReducer = function (state) {
    return state.map(function (n) {
        return new tree_node_1.TreeNode(n.id, n.url, n.name, n.nodeType, n.idFather, n.locked, n.lockedBy, n.hasPositions, n.commodityGroup, n.commodityPart);
    });
};
//# sourceMappingURL=tree-node-reducer.js.map