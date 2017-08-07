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
var node_selector_service_1 = require("./node-selector.service");
var position_service_1 = require("./position.service");
var ui_status_service_1 = require("../core/ui-status.service");
var commodity_group_1 = require("./commodity-group");
var commodity_part_1 = require("./commodity-part");
var modal_1 = require("../ng2-bs3-modal/components/modal");
var PositionsListComponent = (function () {
    function PositionsListComponent(selectorService, positionsService, uiStatusService) {
        this.selectorService = selectorService;
        this.positionsService = positionsService;
        this.uiStatusService = uiStatusService;
        this.loadingVisible = false;
        this.DELETION_NODE_QUANTITIES = "DELETION_NODE_QUANTITIES";
        this.DELETION_POSITION = "DELETION_POSITION";
        this.positionsCount = 0;
        this._currentPage = 0;
    }
    PositionsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nodeName = '-';
        this.nodeLocked = true;
        this.selectorService.selectedNode.subscribe(function (selectedNode) { _this.updateSelection(selectedNode); });
        this.selectorService.selectedNodePath.subscribe(function (path) {
            _this.selectedNodePath = path;
            _this.uiStatusService.nodePath = path;
        });
        this.positionsService.positions.subscribe(function () { return _this.loadingVisible = false; });
        this.positionsService.positionsCount.subscribe(function (positionsCount) {
            _this.positionsCount = positionsCount;
            if (_this.positionsCount === 0) {
                _this.loadingVisible = false;
            }
        });
    };
    PositionsListComponent.prototype.editPosition = function (position) {
        this.uiStatusService.editPosition(position);
    };
    PositionsListComponent.prototype.deletePosition = function (position) {
        this._positionToBeDeleted = position;
        this.deletionAction = this.DELETION_POSITION;
        this.askForConfirmationDeletion();
    };
    PositionsListComponent.prototype.updateSelection = function (selectedNode) {
        this._node = selectedNode;
        this.nodeName = this._node.name;
        this.nodeLocked = selectedNode.locked;
        this.uiStatusService.commodityGroup = !selectedNode.commodityGroup ? new commodity_group_1.CommodityGroup(0, "", "") : selectedNode.commodityGroup;
        console.log("position-list.component - updateSelection - !!this.uiStatusService.commodityGroup.id: " + this.uiStatusService.commodityGroup.id); //TODO: remove
        this.uiStatusService.commodityPart = !selectedNode.commodityPart ? new commodity_part_1.CommodityPart(0, "", "", this.uiStatusService.commodityGroup.code) : selectedNode.commodityPart;
        console.log("position-list.component - updateSelection - !!this.uiStatusService.commodityPart.id: " + this.uiStatusService.commodityPart.id); //TODO: remove
        this.positionsService.selectNode(selectedNode.id);
        this.uiStatusService.updateNodePositions(selectedNode.id);
        this.onPageChanged(this._currentPage);
    };
    PositionsListComponent.prototype.addCatalogItem = function (hideTag) {
        this.uiStatusService.setInsertPosition(true, false, hideTag);
    };
    PositionsListComponent.prototype.addTagItem = function () {
        this.uiStatusService.setInsertPosition(true, true, false);
    };
    PositionsListComponent.prototype.askForConfirmationDeletion = function () {
        this.confirmModal.open('sm');
    };
    PositionsListComponent.prototype.clearNode = function () {
        this.deletionAction = this.DELETION_NODE_QUANTITIES;
        this.askForConfirmationDeletion();
    };
    PositionsListComponent.prototype.confirmDeletion = function () {
        var _this = this;
        this.confirmModal.dismiss();
        console.log("positions-list.component -- confirmDeletion -- this.deletionAction: " + this.deletionAction); //TODO: remove
        if (this.deletionAction === this.DELETION_POSITION) {
            console.log("positions-list.component -- confirmDeletion -- deletePosition -- !!this._positionToBeDeleted: " + !!this._positionToBeDeleted); //TODO: remove
            this.positionsService.deletePosition(this._positionToBeDeleted).subscribe(function (p) { _this.updateSelection(_this._node); });
        }
        if (this.deletionAction === this.DELETION_NODE_QUANTITIES) {
            console.log("positions-list.component -- confirmDeletion -- clearNode -- this._node.id: " + this._node.id); //TODO: remove
            this.positionsService.clearNode(this._node.id).subscribe(function () { _this.updateSelection(_this._node); });
        }
    };
    PositionsListComponent.prototype.refreshList = function () {
        this.updateSelection(this._node);
    };
    PositionsListComponent.prototype.copyNodeContents = function () {
        this.uiStatusService.nodeToBeCopied = this._node;
    };
    PositionsListComponent.prototype.canPaste = function () {
        if (!this.uiStatusService.nodeToBeCopied) {
            return false;
        }
        if (!this._node.commodityPart || !this._node.commodityPart.id) {
            return true;
        }
        if (!this.uiStatusService.nodeToBeCopied.commodityPart) {
            return false;
        }
        return this.uiStatusService.nodeToBeCopied.commodityPart.id === this._node.commodityPart.id;
    };
    PositionsListComponent.prototype.copyPastedContents = function () {
        var _this = this;
        this.positionsService.pasteNode(this.uiStatusService.nodeToBeCopied.id, this._node.id)
            .subscribe(function () { _this.updateSelection(_this._node); });
    };
    PositionsListComponent.prototype.onPageChanged = function (pageChanged) {
        this.loadingVisible = true;
        this._currentPage = pageChanged;
        this.positionsService.selectPage(this._node.id, pageChanged, 10);
        console.log('position-list.component -- onPageChanged -- pageSelected :' + pageChanged); //TODO: replace
    };
    return PositionsListComponent;
}());
__decorate([
    core_1.ViewChild(modal_1.ModalComponent),
    __metadata("design:type", modal_1.ModalComponent)
], PositionsListComponent.prototype, "confirmModal", void 0);
PositionsListComponent = __decorate([
    core_1.Component({
        selector: "positions-list",
        templateUrl: "app/fill-bom/positions-list.component.html",
        styleUrls: ["app/fill-bom/positions-list.component.css"]
    }),
    __metadata("design:paramtypes", [node_selector_service_1.NodeSelectorService, position_service_1.PositionService, ui_status_service_1.UiStatusService])
], PositionsListComponent);
exports.PositionsListComponent = PositionsListComponent;
//# sourceMappingURL=positions-list.component.js.map