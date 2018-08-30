"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_node_1 = require("./tree-node");
var tree_node_service_1 = require("../core/tree-node.service");
var ui_status_service_1 = require("../core/ui-status.service");
var ElectricalProjectRoot = (function () {
    function ElectricalProjectRoot(_treeNodeService, _uiStatusService) {
        this._treeNodeService = _treeNodeService;
        this._uiStatusService = _uiStatusService;
        this.root = new tree_node_1.TreeNode(0, '/Oratrios.Api/api/Nodest/0/nodes.json', 'Project ' + _uiStatusService.projectCode + ' - '
            + _uiStatusService.disciplineCode, 'project', 0, false, "", false, null, null);
        this.root.expand();
    }
    ElectricalProjectRoot.prototype.ngOnInit = function () {
        this.outMessage = this;
        this.currentView = this;
    };
    ElectricalProjectRoot.prototype.bubbleNodeMessage = function (action, callingView, parentView) {
        this.message.bubbleNodeMessage(action, callingView, parentView);
    };
    ElectricalProjectRoot.prototype.refreshCurrentNode = function (modifiedChildNode) {
        if (modifiedChildNode) {
            this.refreshChildNodes();
        }
    };
    ElectricalProjectRoot.prototype.refreshChildNodes = function () {
        var _this = this;
        // Expand the root to refresh the calculated values
        this.root.expand();
        setTimeout(function () { _this.root.expand(); }, 500);
    };
    return ElectricalProjectRoot;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ElectricalProjectRoot.prototype, "message", void 0);
ElectricalProjectRoot = __decorate([
    core_1.Component({
        selector: 'tree-viewx',
        template: "<tree-view [root]=\"root\" [message]=\"outMessage\" [parentView]=\"currentView\"></tree-view>"
    }),
    __metadata("design:paramtypes", [tree_node_service_1.TreeNodeService, ui_status_service_1.UiStatusService])
], ElectricalProjectRoot);
exports.ElectricalProjectRoot = ElectricalProjectRoot;
//# sourceMappingURL=electrical-project-root.js.map