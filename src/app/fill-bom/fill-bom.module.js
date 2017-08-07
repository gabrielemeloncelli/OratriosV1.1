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
/* tslint:disable:member-ordering no-unused-variable */
var core_1 = require("@angular/core");
var angular2_toaster_1 = require("angular2-toaster");
var positions_list_component_1 = require("./positions-list.component");
var add_position_component_1 = require("./add-position.component");
var commodity_group_service_1 = require("./commodity-group.service");
var commodity_group_store_service_1 = require("./commodity-group-store.service");
var commodity_part_service_1 = require("./commodity-part.service");
var commodity_part_store_service_1 = require("./commodity-part-store.service");
var material_store_service_1 = require("./material-store.service");
var material_service_1 = require("./material.service");
var position_service_1 = require("./position.service");
var position_store_service_1 = require("./position-store.service");
var commodity_table_service_1 = require("./commodity-table.service");
var commodity_table_store_service_1 = require("./commodity-table-store.service");
var commodity_table_value_service_1 = require("./commodity-table-value.service");
var commodity_table_value_store_service_1 = require("./commodity-table-value-store.service");
var attribute_store_service_1 = require("./attribute-store.service");
var attribute_service_1 = require("./attribute.service");
var fill_bom_routing_module_1 = require("./fill-bom-routing.module");
var fill_bom_component_1 = require("./fill-bom.component");
var tree_view_module_1 = require("../lazy-loaded-tree-view/tree-view.module");
var ng2_bs3_modal_module_1 = require("../ng2-bs3-modal/ng2-bs3-modal.module");
var allowed_value_service_1 = require("./allowed-value.service");
var core_module_1 = require("../core/core.module");
var shared_module_1 = require("../shared/shared.module");
var core_est_service_1 = require("./core-est.service");
var node_selector_service_1 = require("./node-selector.service");
var pager_module_1 = require("../pager/pager.module");
var FillBomModule = (function () {
    function FillBomModule() {
    }
    return FillBomModule;
}());
FillBomModule = __decorate([
    core_1.NgModule({
        imports: [core_module_1.CoreModule, fill_bom_routing_module_1.FillBomRoutingModule, tree_view_module_1.TreeViewModule, ng2_bs3_modal_module_1.ModalModule, angular2_toaster_1.ToasterModule, shared_module_1.SharedModule, pager_module_1.PagerModule],
        declarations: [positions_list_component_1.PositionsListComponent, add_position_component_1.AddPositionComponent, fill_bom_component_1.FillBomComponent],
        exports: [positions_list_component_1.PositionsListComponent, add_position_component_1.AddPositionComponent],
        providers: [core_est_service_1.CoreEstService, commodity_group_service_1.CommodityGroupService, commodity_group_store_service_1.CommodityGroupStoreService, commodity_part_service_1.CommodityPartService, commodity_part_store_service_1.CommodityPartStoreService,
            material_store_service_1.MaterialStoreService, material_service_1.MaterialService, position_service_1.PositionService, position_store_service_1.PositionStoreService, commodity_table_service_1.CommodityTableService, commodity_table_store_service_1.CommodityTableStoreService,
            commodity_table_value_service_1.CommodityTableValueService, commodity_table_value_store_service_1.CommodityTableValueStoreService, attribute_store_service_1.AttributeStoreService, attribute_service_1.AttributeService, allowed_value_service_1.AllowedValueService,
            angular2_toaster_1.ToasterService, node_selector_service_1.NodeSelectorService]
    }),
    __metadata("design:paramtypes", [])
], FillBomModule);
exports.FillBomModule = FillBomModule;
//# sourceMappingURL=fill-bom.module.js.map