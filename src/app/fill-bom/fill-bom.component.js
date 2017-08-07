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
var router_1 = require("@angular/router");
var option_1 = require("angular2-select/dist/option");
var select_component_1 = require("angular2-select/dist/select.component");
var tree_node_1 = require("../lazy-loaded-tree-view/tree-node");
var tree_node_service_1 = require("../core/tree-node.service");
var core_est_service_1 = require("./core-est.service");
var ui_status_service_1 = require("../core/ui-status.service");
var commodity_group_service_1 = require("./commodity-group.service");
var commodity_part_service_1 = require("./commodity-part.service");
var modal_1 = require("../ng2-bs3-modal/components/modal");
var nodeDTO_1 = require("../lazy-loaded-tree-view/nodeDTO");
var node_selector_service_1 = require("./node-selector.service");
var FillBomComponent = (function () {
    function FillBomComponent(treeNodeService, coreEstService, uiStatusService, commodityGroupService, router, commodityPartService, selectorService) {
        this.uiStatusService = uiStatusService;
        this.commodityGroupService = commodityGroupService;
        this.router = router;
        this.commodityPartService = commodityPartService;
        this.selectorService = selectorService;
        this.outMessage = this;
        this.confirmButtonText = "Add";
        this.actionType = '';
        this.eventNodeView = null;
        this.eventNode = null;
        this.eventParentNodeView = null;
        this.root = null;
        this.positionAdd = false;
        this.positionIsTag = false;
        this.conflictDetected = false;
        this.canConfirmConflict = false;
        this.warningMessage = '';
        this.commodityGroups = new Array();
        this.commodityParts = new Array();
        this.changedNode = new tree_node_1.TreeNode(0, "", "", "", 0, false, "", false, null, null);
        this.value = {};
        this.nodeNameDisabled = false;
        this.treeNodeService = treeNodeService;
        this.coreEstService = coreEstService;
    }
    FillBomComponent.prototype.handleNode = function () {
        this.conflictDetected = false;
        this.canConfirmConflict = false;
        this.warningMessage = '';
        this.confirmButtonText = 'Add';
        this.nodeNameDisabled = false;
        this.nodeTypeChangeDisabled = false;
        this.nameIsPullDown = false;
        if (!!this.nodeSelectorComponent) {
            if (!!this.nodeSelectorComponent.value) {
                this.nodeSelectorComponent.clear();
            }
        }
    };
    FillBomComponent.prototype.addChildNode = function () {
        this.actionType = 'add';
        this.changedNode = new tree_node_1.TreeNode(0, "", "", "", this.eventNode.id, false, "", false, null, null);
        this.handleNode();
        if (this.eventNode && !!this.eventNode.commodityGroup && !this.eventNode.commodityPart) {
            this.changedNode.commodityGroup = this.eventNode.commodityGroup;
            this.changedNode.type = this.uiStatusService.PART_CODE;
            this.nodeTypeChangeDisabled = true;
            this.nameIsPullDown = true;
            this.nodeNameOptions = new Array();
            if (this.eventNode && this.eventNode.commodityGroup) {
                this.commodityPartService.getAll(this.eventNode.commodityGroup.id);
            }
        }
        this.modalComponent.open();
    };
    FillBomComponent.prototype.editNode = function () {
        this.actionType = 'edit';
        this.changedNode = new tree_node_1.TreeNode(this.eventNode.id, this.eventNode.url, this.eventNode.name, this.eventNode.type, this.eventNode.idFather, this.eventNode.locked, this.eventNode.lockedBy, this.eventNode.hasPositions, this.eventNode.commodityGroup, this.eventNode.commodityPart);
        this.handleNode();
        this.nodeTypeChangeDisabled = !!this.changedNode.commodityGroup || !!this.changedNode.commodityPart;
        this.confirmButtonText = 'Save';
        this.modalComponent.open();
    };
    FillBomComponent.prototype.deleteNode = function () {
        this.actionType = 'delete';
        this.changedNode = this.eventNode;
        this.handleNode();
        this.confirmButtonText = 'Delete';
        this.modalComponent.open();
        this.nodeNameDisabled = true;
        this.nodeTypeChangeDisabled = true;
    };
    FillBomComponent.prototype.toggleLockNode = function () {
        this.actionType = 'togglelock';
        this.changedNode = this.eventNode;
        this.handleNode();
        this.changedNode.locked = !this.eventNode.locked;
        this.storeNode();
    };
    FillBomComponent.prototype.createNodeTypeOptions = function () {
        var result = new Array();
        for (var _i = 0, _a = this.nodeTypes; _i < _a.length; _i++) {
            var loopNodeType = _a[_i];
            if (loopNodeType.code != this.uiStatusService.PART_CODE) {
                result.push(new option_1.Option(loopNodeType.code, loopNodeType.code + " - " + loopNodeType.description));
            }
        }
        return result;
    };
    FillBomComponent.prototype.createPartNameOptions = function (parts) {
        this.commodityParts = parts;
        return parts.map(function (p) { return new option_1.Option(p.id.toString(), p.code + " - " + p.description); });
    };
    FillBomComponent.prototype.createGroupNameOptions = function () {
        return this.commodityGroups.map(function (g) { return new option_1.Option(g.id.toString(), g.code + " - " + g.description); });
    };
    FillBomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commodityGroupService.getAll(this.uiStatusService.disciplineId);
        this.uiStatusService.insertPosition.subscribe(function (details) {
            _this.positionAdd = details.displayInsertPosition;
            _this.positionIsTag = details.positionFromTag;
        });
        this.uiStatusService.editPositionObservable.subscribe(function (position) {
            _this.positionAdd = true;
            if (position) {
                _this.positionIsTag = position.isTwm;
            }
            else {
                _this.positionIsTag = false;
            }
        });
        setTimeout(function () {
            _this.nodeTypes = _this.uiStatusService.nodeTypes;
            _this.nodeTypeOptions = _this.createNodeTypeOptions();
        }, 1000);
        this.nodeSelectorPlaceholder = "Select / Change node type";
        this.commodityGroupService.groups.subscribe(function (g) { return _this.commodityGroups = g; });
        this.commodityPartService.parts.subscribe(function (p) { return _this.nodeNameOptions = _this.createPartNameOptions(p); });
        this.selectorService.selectedNodePath.subscribe(function (path) { return _this.windowResized(); });
        this.windowResized();
        this.trimSize();
    };
    FillBomComponent.prototype.tryStoreNode = function () {
        return this.baseStoreNode(false);
    };
    FillBomComponent.prototype.storeNodeConfirm = function () {
        return this.baseStoreNode(true);
    };
    FillBomComponent.prototype.baseStoreNode = function (forceDifferentType) {
        var _this = this;
        var newNode = this.createNodeDTO();
        newNode.forceDifferentType = forceDifferentType;
        var action = this.createNodeAction(newNode);
        if (action.name) {
            this.treeNodeService.persistNode(action)
                .subscribe(function () {
                _this.refreshTree();
                _this.modalComponent.dismiss();
            }, function (error) {
                if (error.status && error.status === 409) {
                    _this.warningMessage = error.message;
                    _this.conflictDetected = true;
                    var stringMessage = error.message.toString();
                    if (stringMessage.length >= 61) {
                        stringMessage = stringMessage.substring(0, 61);
                    }
                    _this.canConfirmConflict = stringMessage === 'The following node type(s) are already present in the branch:';
                }
            });
        }
    };
    FillBomComponent.prototype.storeNode = function () {
        var _this = this;
        var newNode = this.createNodeDTO();
        var action = this.createNodeAction(newNode);
        if (action.name) {
            this.treeNodeService.persistNode(action)
                .subscribe(function () { _this.refreshTree(); });
        }
    };
    FillBomComponent.prototype.createNodeDTO = function () {
        var newNode = new nodeDTO_1.NodeDTO();
        newNode.id = 0;
        newNode.nodeType = this.changedNode.type;
        newNode.name = this.changedNode.name;
        newNode.locked = this.changedNode.locked;
        newNode.lockedBy = this.uiStatusService.userCode;
        newNode.idFather = this.changedNode.idFather;
        newNode.url = 'api/Nodes/' + newNode.id;
        newNode.commodityGroup = this.changedNode.commodityGroup;
        newNode.commodityPart = this.changedNode.commodityPart;
        newNode.projectDisciplineId = this.uiStatusService.projectDisciplineId;
        return newNode;
    };
    FillBomComponent.prototype.createNodeAction = function (newNode) {
        var action;
        action = { name: null, url: 'api/Nodes/' + this.eventNode.id.toString(), node: newNode };
        switch (this.actionType) {
            case 'add':
                newNode.id = 0;
                newNode.url = 'api/Nodes/' + newNode.id;
                newNode.idFather = this.eventNode.id;
                action.name = 'STORE_NODE';
                action.url = 'api/Nodes';
                break;
            case 'edit':
            case 'togglelock':
                action.name = 'EDIT_NODE';
                break;
            case 'delete':
                action.name = 'DELETE_NODE';
                break;
        }
        return action;
    };
    FillBomComponent.prototype.bubbleNodeMessage = function (action, callingView, parentView) {
        this.eventNodeView = callingView;
        this.eventParentNodeView = parentView;
        this.eventNode = callingView.root;
        switch (action) {
            case 'add':
                this.addChildNode();
                break;
            case 'delete':
                this.deleteNode();
                break;
            case 'edit':
                this.editNode();
                break;
            case 'togglelock':
                this.toggleLockNode();
                break;
        }
    };
    FillBomComponent.prototype.refreshTree = function () {
        switch (this.actionType) {
            case 'add':
                this.eventNodeView.refreshCurrentNode(true);
                break;
            case 'delete':
                this.eventParentNodeView.refreshCurrentNode(true);
                break;
            case 'edit':
            case 'togglelock':
                this.eventNodeView.refreshCurrentNode(false);
                break;
        }
    };
    FillBomComponent.prototype.refreshChildNodes = function () { };
    FillBomComponent.prototype.refreshCurrentNode = function (modifiedChildNode) { };
    FillBomComponent.prototype.exportFile = function () {
        this.router.navigate(['/export']);
    };
    FillBomComponent.prototype.nodeTypeSelected = function (value) {
        this.changedNode.type = value.value;
        this.nameIsPullDown = false;
        if (this.changedNode.type === this.uiStatusService.GROUP_CODE) {
            this.nameIsPullDown = true;
            this.nodeNameOptions = this.createGroupNameOptions();
        }
        else {
            this.changedNode.commodityGroup = null;
            this.changedNode.commodityPart = null;
        }
    };
    FillBomComponent.prototype.nodeNameSelected = function (value) {
        this.changedNode.name = this.selectGroupOrPart(+value.value);
    };
    FillBomComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    FillBomComponent.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    FillBomComponent.prototype.refreshValue = function (value) {
        this.value = value;
    };
    FillBomComponent.prototype.selectGroupOrPart = function (entityId) {
        var entityCode = "";
        var useGroup = (!!this.eventNode.commodityGroup && !this.eventNode.commodityPart && this.actionType === "add")
            || (!!this.eventNode.commodityGroup && !!this.eventNode.commodityPart && this.actionType === "edit");
        if (useGroup) {
            var filteredPart = this.commodityParts.filter(function (p) { return p.id === entityId; });
            if (filteredPart.length > 0) {
                entityCode = filteredPart[0].code;
                this.changedNode.commodityPart = filteredPart[0];
            }
        }
        else {
            var filteredGroup = this.commodityGroups.filter(function (g) { return g.id === entityId; });
            if (filteredGroup.length > 0) {
                entityCode = filteredGroup[0].code;
                this.changedNode.commodityGroup = filteredGroup[0];
            }
        }
        return entityCode;
    };
    FillBomComponent.prototype.trimSize = function () {
        window.addEventListener("resize", this.windowResized);
    };
    FillBomComponent.prototype.windowResized = function () {
        var column = document.getElementById("main-fill-bom-col-1");
        if (!!column) {
            column.style.maxHeight = (window.innerHeight - 180).toString() + "px";
        }
        column = document.getElementById("main-fill-bom-col-2");
        if (!!column) {
            column.style.maxHeight = (window.innerHeight - 240).toString() + "px";
        }
    };
    return FillBomComponent;
}());
__decorate([
    core_1.ViewChild('nodeTypeSelector'),
    __metadata("design:type", select_component_1.SelectComponent)
], FillBomComponent.prototype, "nodeSelectorComponent", void 0);
__decorate([
    core_1.ViewChild(modal_1.ModalComponent),
    __metadata("design:type", modal_1.ModalComponent)
], FillBomComponent.prototype, "modalComponent", void 0);
FillBomComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/fill-bom/fill-bom.component.html',
        styleUrls: ['app/fill-bom/fill-bom.component.css'],
        selector: 'main-view'
    }),
    __metadata("design:paramtypes", [tree_node_service_1.TreeNodeService, core_est_service_1.CoreEstService,
        ui_status_service_1.UiStatusService, commodity_group_service_1.CommodityGroupService,
        router_1.Router, commodity_part_service_1.CommodityPartService,
        node_selector_service_1.NodeSelectorService])
], FillBomComponent);
exports.FillBomComponent = FillBomComponent;
//# sourceMappingURL=fill-bom.component.js.map