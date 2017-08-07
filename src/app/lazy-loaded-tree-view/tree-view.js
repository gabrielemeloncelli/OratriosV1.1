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
var node_selector_service_1 = require("../fill-bom/node-selector.service");
var ui_status_service_1 = require("../core/ui-status.service");
var TreeView = (function () {
    function TreeView(treeNodeService, selectorService, uiStatusService) {
        this.treeNodeService = treeNodeService;
        this.selectorService = selectorService;
        this.uiStatusService = uiStatusService;
        this.items = [];
        this.isSelected = false;
        this.currentView = this;
        console.log("tree-view -- constructor -- uiStatusService.userIsAdministrator: " + uiStatusService.userIsAdministrator); //TODO: remove
    }
    TreeView.prototype.refreshCurrentNode = function (modifiedChildNode) {
        var _this = this;
        console.log("tree-view - refreshCurrentNode - root exixst: " + !!this.root); //TODO: remove
        console.log("tree-view - refreshCurrentNode - root.id: " + this.root.id); //TODO: remove
        this.treeNodeService.getSingleNode(this.root.id)
            .subscribe(function (r) {
            _this.root.url = r.url;
            if (_this.root.id > 0) {
                _this.root.name = r.name;
                _this.root.type = r.type;
                _this.root.locked = r.locked;
                _this.root.lockedBy = r.lockedBy;
            }
            if (modifiedChildNode) {
                if (_this.root.expanded) {
                    _this.root.expand();
                }
                _this.root.expand();
                _this.refreshChildNodes();
            }
        });
    };
    TreeView.prototype.refreshChildNodes = function () {
        var _this = this;
        if (this.root.url) {
            this.treeNodeService.fetchTreeNodes(this.root.id, this.uiStatusService.projectDisciplineId)
                .subscribe(function (r) { _this.items = r; });
        }
    };
    TreeView.prototype.ngOnInit = function () {
        var _this = this;
        //this.subscription = this._store.getTreeNodes(this.root.id).subscribe((res:any) => {
        //  this.items = res;
        //});
        //this._treeNodeService.loadTreeNodes(this.root);
        this.outMessage = this;
        if (this.root.expanded) {
            this.refreshChildNodes();
        }
        this.uiStatusService.nodePositionsUpdate.subscribe(function (upd) {
            if (upd.id === _this.root.id) {
                _this.root.hasPositions = upd.hasPositions;
            }
        });
        this.selectorService.selectedNode.subscribe(function (node) {
            _this.isSelected = _this.root.id === node.id;
        });
    };
    Object.defineProperty(TreeView.prototype, "enabled", {
        get: function () {
            if (!this.uiStatusService.userCode) {
                return false;
            }
            if (this.uiStatusService.userIsAdministrator) {
                return true;
            }
            if (!!this.root && this.uiStatusService.userCode === this.root.lockedBy) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeView.prototype, "lockClasses", {
        get: function () {
            {
                if (this.root.locked) {
                    if (this.enabled) {
                        return "btn btn-warning btn-xs pull-right";
                    }
                    else {
                        return "btn btn-danger btn-xs pull-right";
                    }
                }
                else {
                    return "btn btn-success btn-xs pull-right";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeView.prototype.expand = function () {
        this.root.expand();
        if (this.root.expanded === true) {
            this.refreshChildNodes();
        }
    };
    TreeView.prototype.ngOnDestroy = function () {
    };
    TreeView.prototype.addNode = function () {
        this.bubbleNodeMessage('add', this, this.parentView);
    };
    TreeView.prototype.bubbleNodeMessage = function (action, callingView, parentView) {
        this.message.bubbleNodeMessage(action, callingView, parentView);
    };
    TreeView.prototype.editNode = function () {
        this.bubbleNodeMessage('edit', this, this.parentView);
    };
    TreeView.prototype.deleteNode = function () {
        this.bubbleNodeMessage('delete', this, this.parentView);
    };
    TreeView.prototype.persistNode = function (action) {
        var _this = this;
        this.treeNodeService.persistNode(action)
            .subscribe(function () { _this.refreshChildNodes(); });
    };
    TreeView.prototype.toggleLockNode = function () {
        this.bubbleNodeMessage('togglelock', this, this.parentView);
    };
    TreeView.prototype.selectRoot = function () {
        if (this.root.id > 0) {
            this.selectorService.selectNode(this.root);
        }
    };
    TreeView.prototype.canEdit = function () {
        if (!(this.root.id !== 0 && this.uiStatusService.userIsAdministrator)) {
            return false;
        }
        if (!!this.root.commodityPart) {
            return false;
        }
        if (!!this.root.commodityGroup && !this.root.commodityPart) {
            return false;
        }
        return true;
    };
    return TreeView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_node_1.TreeNode)
], TreeView.prototype, "root", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeView.prototype, "message", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeView.prototype, "parentView", void 0);
TreeView = __decorate([
    core_1.Component({
        templateUrl: 'app/lazy-loaded-tree-view/tree-view.html',
        styleUrls: ['app/lazy-loaded-tree-view/tree-view.css'],
        selector: 'tree-view',
    }),
    __metadata("design:paramtypes", [tree_node_service_1.TreeNodeService, node_selector_service_1.NodeSelectorService,
        ui_status_service_1.UiStatusService])
], TreeView);
exports.TreeView = TreeView;
//# sourceMappingURL=tree-view.js.map