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
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var tree_node_1 = require("../lazy-loaded-tree-view/tree-node");
var NodeSelectorService = (function () {
    function NodeSelectorService(http) {
        this.http = http;
        this.lastSelectedNode = new tree_node_1.TreeNode(0, "", "", "", 0, false, "", false, null, null);
        this._selectedNodeSource = new Subject_1.Subject();
        this._selectedNodePathSource = new Subject_1.Subject();
        this.BASE_URL = 'api/nodes/';
        this.selectedNode = this._selectedNodeSource.asObservable();
        this.selectedNodePath = this._selectedNodePathSource.asObservable();
    }
    NodeSelectorService.prototype.selectNode = function (node) {
        if (node.id > 0) {
            this.lastSelectedNode = node;
            this._selectedNodePathSource.next("");
            this.getPath();
            this._selectedNodeSource.next(node);
        }
    };
    NodeSelectorService.prototype.refreshNode = function () {
        this.selectNode(this.lastSelectedNode);
    };
    NodeSelectorService.prototype.getPath = function () {
        var _this = this;
        this.http.get(this.BASE_URL + this.lastSelectedNode.id.toString() + "/path")
            .map(function (r) { return r.json(); })
            .subscribe(function (t) {
            _this._selectedNodePathSource.next(t.path);
        });
    };
    return NodeSelectorService;
}());
NodeSelectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NodeSelectorService);
exports.NodeSelectorService = NodeSelectorService;
//# sourceMappingURL=node-selector.service.js.map