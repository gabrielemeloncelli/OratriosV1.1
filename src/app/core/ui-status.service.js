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
var Subject_1 = require("rxjs/Subject");
var insert_position_details_1 = require("../fill-bom/insert-position-details");
var node_type_service_1 = require("./node-type.service");
var commodity_group_1 = require("../fill-bom/commodity-group");
var commodity_part_1 = require("../fill-bom/commodity-part");
var tree_node_service_1 = require("./tree-node.service");
var UiStatusService = (function () {
    function UiStatusService(nodeTypeService, nodeService) {
        var _this = this;
        this.nodeTypeService = nodeTypeService;
        this.nodeService = nodeService;
        this._insertPosition = new Subject_1.Subject();
        this.insertPosition = this._insertPosition.asObservable();
        this._editPositionSubject = new Subject_1.Subject();
        this.editPositionObservable = this._editPositionSubject.asObservable();
        this.commodityGroup = new commodity_group_1.CommodityGroup(0, "", "");
        this.tablesAndSizesVisible = false;
        this.materialsVisible = false;
        this.disciplineCode = "";
        this.disciplineId = 0;
        this.projectDisciplineId = 0;
        this.projectId = 0;
        this.projectCode = "";
        this.GROUP_CODE = "C_GROUP";
        this.PART_CODE = "C_PART";
        this.commodityPart = new commodity_part_1.CommodityPart(0, "", "", "");
        this.nodePath = "";
        this.nodePositionsUpdateSubject = new Subject_1.Subject();
        this.nodePositionsUpdate = this.nodePositionsUpdateSubject.asObservable();
        this.nodeService.nodePositionsUpdate.subscribe(function (n) { return _this.nodePositionsUpdateSubject.next(n); });
    }
    UiStatusService.prototype.setInsertPosition = function (insertPositionVisible, insertTagPosition, hideTag) {
        var details = new insert_position_details_1.InsertPositionDetails();
        details.displayInsertPosition = insertPositionVisible;
        details.positionFromTag = insertTagPosition;
        details.hideTag = hideTag;
        this._insertPosition.next(details);
    };
    UiStatusService.prototype.editPosition = function (positionToEdit) {
        this._editPositionSubject.next(positionToEdit);
    };
    UiStatusService.prototype.selectProject = function (projectId) {
        var _this = this;
        this.nodeTypes = new Array();
        console.log("ui-status.service -- selectProject"); //TODO: remove
        this.nodeTypeService.getNodeTypes(projectId)
            .subscribe(function (nodes) {
            _this.nodeTypes = nodes;
            console.log("ui-status.service -- selectProject - node types retrieved"); //TODO: remove
        });
    };
    UiStatusService.prototype.updateNodePositions = function (id) {
        this.nodeService.updateNodePositions(id);
    };
    return UiStatusService;
}());
UiStatusService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [node_type_service_1.NodeTypeService,
        tree_node_service_1.TreeNodeService])
], UiStatusService);
exports.UiStatusService = UiStatusService;
//# sourceMappingURL=ui-status.service.js.map