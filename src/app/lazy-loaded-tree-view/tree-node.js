"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = (function () {
    function TreeNode(id, url, name, type, idFather, locked, lockedBy, hasPositions, commodityGroup, commodityPart) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.type = type;
        this.idFather = idFather;
        this.locked = locked;
        this.lockedBy = lockedBy;
        this.hasPositions = hasPositions;
        this.commodityGroup = commodityGroup;
        this.commodityPart = commodityPart;
        this.expanded = false;
        this.cssClass = null;
        this.cssClass = this.getCssClass();
    }
    TreeNode.prototype.expand = function () {
        if (this.url) {
            this.expanded = !this.expanded;
            this.cssClass = this.getCssClass();
        }
    };
    TreeNode.prototype.canDelete = function () {
        if (!!this.url) {
            return false;
        }
        return !this.hasPositions;
    };
    TreeNode.prototype.getCssClass = function () {
        if (this.url) {
            if (this.expanded) {
                return 'glyphicon glyphicon-chevron-down';
            }
            return 'glyphicon glyphicon-chevron-right';
        }
        return 'glyphicon glyphicon-minus';
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=tree-node.js.map