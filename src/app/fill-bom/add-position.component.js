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
var option_1 = require("angular2-select/dist/option");
var select_component_1 = require("angular2-select/dist/select.component");
var ui_status_service_1 = require("../core/ui-status.service");
var modal_1 = require("../ng2-bs3-modal/components/modal");
var commodity_group_1 = require("./commodity-group");
var commodity_group_service_1 = require("./commodity-group.service");
var commodity_part_1 = require("./commodity-part");
var commodity_part_service_1 = require("./commodity-part.service");
var mapped_table_1 = require("./mapped-table");
var commodity_table_service_1 = require("./commodity-table.service");
var material_1 = require("./material");
var material_service_1 = require("./material.service");
var table_and_size_filter_1 = require("./table-and-size-filter");
var table_filter_1 = require("./table-filter");
var bom_position_1 = require("./bom-position");
var node_selector_service_1 = require("./node-selector.service");
var position_service_1 = require("./position.service");
var attribute_service_1 = require("./attribute.service");
var position_attribute_value_1 = require("./position-attribute-value");
var position_input_1 = require("./position-input");
var position_error_1 = require("./position-error");
var allowed_value_service_1 = require("./allowed-value.service");
var AddPositionComponent = (function () {
    function AddPositionComponent(uiStatusService, commodityGroupService, commodityPartService, commodityTableService, materialService, selectorService, positionService, attributeService, allowedValueService) {
        this.uiStatusService = uiStatusService;
        this.commodityGroupService = commodityGroupService;
        this.commodityPartService = commodityPartService;
        this.commodityTableService = commodityTableService;
        this.materialService = materialService;
        this.selectorService = selectorService;
        this.positionService = positionService;
        this.attributeService = attributeService;
        this.allowedValueService = allowedValueService;
        this.groups = new Array();
        this.groupsDisabled = false;
        this.parts = new Array();
        this.materials = new Array();
        this.addedPositions = new Array();
        this.tables = new Array();
        this._tableFilters = new Array();
        this.position = new bom_position_1.BomPosition();
        this.selectedMaterial = null;
        this._selectedMaterialVisible = false;
        this._tagAndQuantityVisible = false;
        this._isTag = false;
        this._description2Keypress = false;
        this._isEdit = false;
        this.allowedValues = new Array();
        this.hideGroup = false;
        this.hidePart = false;
        this.filteredMaterialsLoading = false;
        this.commoditySelection = false;
        this.materialLoadingError = "";
        this._loadingTimeoutExpired = false;
        this._tagStep2 = false;
        this._commodityPropertiesSwitch = true;
        this.totItems = 0;
        this._allowedUnits = new Array();
        this._allowedUnits.push(new option_1.Option("U", "U"));
        this._allowedUnits.push(new option_1.Option("M2", "M2"));
        this.resetMaterial();
        this.resetAddedPositions();
    }
    AddPositionComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.uiStatusService.insertPosition.subscribe(function (detail) {
            console.log("insertPositionCallback - detail == null: " + (detail == null));
            if (detail.displayInsertPosition) {
                _this._isTag = detail.positionFromTag;
                _this._tagStep2 = false;
                _this._commodityPropertiesSwitch = !_this._isTag;
                _this.resetPosition();
                _this.hideGroup = !!_this.uiStatusService.commodityGroup.id;
                console.log("add-position.component -- ngAfterViewInit -- this.uiStatusService.commodityGroup.id: " + _this.uiStatusService.commodityGroup.id);
                _this.hidePart = !!_this.uiStatusService.commodityPart.id;
                _this.hideTag = detail.hideTag;
                _this._tagAndQuantityVisible = _this.hideGroup && _this.hidePart && _this._isTag;
                if (_this.hideGroup) {
                    if (_this.hidePart) {
                        _this._parts = new Array();
                        _this._parts.push(_this.uiStatusService.commodityPart);
                        var partOption = new option_1.Option('' + _this.uiStatusService.commodityPart.id, '' + _this.uiStatusService.commodityPart.id);
                        _this.partSelected(partOption);
                    }
                    else {
                        var groupOption = new option_1.Option('' + _this.uiStatusService.commodityGroup.id, '' + _this.uiStatusService.commodityGroup.id);
                        _this.groupSelected(groupOption);
                    }
                }
                setTimeout(function () { return _this.modalComponent.open('fs'); }, 200);
            }
        });
        this.uiStatusService.editPositionObservable.subscribe(function (position) {
            console.log("editPositionCallback - position == null: " + (position == null));
            if (position) {
                _this._isTag = position.isTwm;
                _this._tagStep2 = true;
                _this._commodityPropertiesSwitch = true;
                _this.editPositionByObject(position);
                setTimeout(function () { return _this.modalComponent.open('fs'); }, 200);
            }
        });
        this.attributeService.attributes.subscribe(function (attributes) {
            _this.attributes = attributes;
            for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
                var attribute = attributes_1[_i];
                _this.allowedValues[attribute.spmatId] = new Array();
                _this.allowedValueService.getAll(attribute.spmatId)
                    .subscribe(function (v) {
                    if (true && v && v.length > 0) {
                        var index = v[0].attributeId;
                        _this.allowedValues[index] = v.map(function (v1) { return new option_1.Option(v1.value, v1.value); });
                    }
                });
            }
        });
        this.attributeService.getAll(this.uiStatusService.projectDisciplineId);
        if (!!this.uiStatusService.commodityGroup) {
            this.selectedMaterial.groupCode = this.uiStatusService.commodityGroup.code;
            if (!!this.uiStatusService.commodityPart.id) {
                this.partObjectSelected(this.uiStatusService.commodityPart, false);
            }
        }
        this.allowedValueService.getAll;
    };
    AddPositionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commodityGroupService.groups.subscribe(function (groups) {
            _this.groups = groups.map(function (g) { return new option_1.Option(g.id.toString(), g.code + " - " + g.description); });
            _this._groups = groups;
        });
        this.commodityPartService.parts.subscribe(function (parts) {
            _this.parts = parts.map(function (p) { return new option_1.Option(p.id.toString(), p.code + " - " + p.description); });
            _this._parts = parts;
            _this.changeGroup();
        });
        this.commodityTableService.tables.subscribe(function (tables) {
            setTimeout(function () { return _this.uiStatusService.tablesAndSizesVisible = (_this.selectedMaterial.partCode != ""); }, 100);
            _this.tables = tables.map(function (t) { return new mapped_table_1.MappedTable(t); });
        });
        this.materialService.materials.subscribe(function (materials) {
            if (_this._loadingTimeoutExpired) {
                _this.filteredMaterialsLoading = false;
            }
            else {
                setTimeout(function () { return _this.filteredMaterialsLoading = false; }, 500);
            }
            _this.materials = materials;
            _this.materialLoadingError = "";
            if (materials.length == 0) {
                _this.materialLoadingError = "No material found.";
            }
            if (_this._isEdit && _this.materials.length > 0) {
                _this.selectedMaterial = _this.materials[0];
            }
        });
        this.materialService.totalItems.subscribe(function (totalItems) {
            _this.totItems = totalItems;
        });
        this.modalComponent.onDismiss.subscribe(function () { return _this.cleanupModal(); });
    };
    AddPositionComponent.prototype.removed = function (event) { };
    AddPositionComponent.prototype.typed = function (event) { };
    AddPositionComponent.prototype.groupSelected = function (event) {
        var foundGroup = this.findSelectedGroup(+event.value);
        this.selectedMaterial.groupCode = foundGroup.code;
        this.uiStatusService.commodityGroup = foundGroup;
        this.uiStatusService.commodityPart = new commodity_part_1.CommodityPart(0, "", "", foundGroup.code);
        this.commodityPartService.getAll(event.value); //TODO:verify the returned type and property values of the event
    };
    AddPositionComponent.prototype.findSelectedGroup = function (id) {
        var result = null;
        var i;
        for (i = 0; i < this._groups.length; i += 1) {
            if (this._groups[i].id === id) {
                result = this._groups[i];
            }
        }
        return result;
    };
    AddPositionComponent.prototype.partSelected = function (event) {
        var foundPart = this.findSelectedPart(+event.value);
        this.partObjectSelected(foundPart, true);
    };
    AddPositionComponent.prototype.partObjectSelected = function (selectedPart, updateUiStatusService) {
        this.tables = new Array();
        this._tableFilters = new Array();
        this.resetPositionModel();
        this.resetMaterial();
        this.materials = new Array();
        this.materialLoadingError = "";
        this.selectedMaterial.partId = selectedPart.id;
        this.selectedMaterial.partCode = selectedPart.code;
        this._selectedMaterialVisible = false;
        this.uiStatusService.materialsVisible = false;
        if (updateUiStatusService) {
            this.uiStatusService.commodityPart = selectedPart;
        }
        if (this._isTag) {
            this._tagAndQuantityVisible = true;
        }
        else {
            this.commodityTableService.getAll(this.uiStatusService.disciplineCode, selectedPart.groupCode, selectedPart.code);
        }
        console.log("add-position.component -- partObjectSelected -- this._tagAndQuantityVisible: " + this._tagAndQuantityVisible.toString()); //TODO: remove
    };
    AddPositionComponent.prototype.findSelectedPart = function (id) {
        var result = null;
        var i;
        for (i = 0; i < this._parts.length; i += 1) {
            if (this._parts[i].id === id) {
                result = this._parts[i];
            }
        }
        return result;
    };
    AddPositionComponent.prototype.tableSelected = function (event, tableName) {
        var foundFilter = null;
        for (var tableIndex = 0; tableIndex < this._tableFilters.length; tableIndex += 1) {
            if (this._tableFilters[tableIndex].tableName === tableName) {
                foundFilter = this._tableFilters[tableIndex];
            }
        }
        if (!foundFilter) {
            foundFilter = new table_filter_1.TableFilter(tableName, event.value);
            this._tableFilters.push(foundFilter);
        }
        else {
            foundFilter.detail = event.value;
        }
    };
    AddPositionComponent.prototype.findMaterial = function () {
        var _this = this;
        this.uiStatusService.materialsVisible = true;
        this.filteredMaterialsLoading = true;
        var filter = this.getFilter();
        this.materials = new Array();
        this.materialLoadingError = "";
        this._loadingTimeoutExpired = false;
        setTimeout(function () { return _this._loadingTimeoutExpired = true; }, 1000);
        this.materialService.getAllCount(this.uiStatusService.commodityPart.id, filter);
    };
    AddPositionComponent.prototype.getFilter = function () {
        var tableFilters = new Array();
        for (var tableIndex = 0; tableIndex < this._tableFilters.length; tableIndex += 1) {
            tableFilters.push(new table_filter_1.TableFilter(this._tableFilters[tableIndex].tableName, this._tableFilters[tableIndex].detail));
        }
        return new table_and_size_filter_1.TableAndSizeFilter(tableFilters);
    };
    AddPositionComponent.prototype.tableRemoved = function (tableName) {
        var foundFilterPosition = this.findFilterPosition(tableName);
        if (foundFilterPosition > -1) {
            this._tableFilters.splice(foundFilterPosition, 1);
        }
    };
    AddPositionComponent.prototype.unitRemoved = function () {
        this.selectedMaterial.unit = "";
    };
    AddPositionComponent.prototype.unitSelected = function (option) {
        if (option) {
            this.selectedMaterial.unit = option.value;
        }
    };
    AddPositionComponent.prototype.findFilterPosition = function (tableName) {
        var foundIndex = -1;
        for (var loopIndex = 0; loopIndex < this._tableFilters.length; loopIndex += 1) {
            if (this._tableFilters[loopIndex].tableName === tableName) {
                foundIndex = loopIndex;
            }
        }
        return foundIndex;
    };
    AddPositionComponent.prototype.onSubmit = function () {
    };
    AddPositionComponent.prototype.resetTest = function () {
    };
    AddPositionComponent.prototype.resetPosition = function () {
        this._isEdit = false;
        this.resetAddedPositions();
        this.resetGroupAndPart();
        if (!this.uiStatusService.commodityPart.id) {
            this.commodityPartService.getAll(-1);
        }
    };
    AddPositionComponent.prototype.resetAddedPositions = function () {
        this.addedPositions = new Array();
    };
    AddPositionComponent.prototype.resetGroupAndPart = function () {
        if (this.selectComponent) {
            this.selectComponent.clear();
        }
        if (!this.uiStatusService.commodityGroup.id) {
            this.uiStatusService.commodityGroup = new commodity_group_1.CommodityGroup(0, "", "");
        }
        if (!this.uiStatusService.commodityPart.id) {
            this.uiStatusService.commodityPart = new commodity_part_1.CommodityPart(0, "", "", "");
        }
        this.uiStatusService.tablesAndSizesVisible = false;
        this._tableFilters = new Array();
        console.log("add-position.component -- resetGroupAndPart -- !this.uiStatusService.commodityPart.id" + !this.uiStatusService.commodityPart.id); //TODO: remove
        if (!this.uiStatusService.commodityPart.id) {
            this.resetPart();
        }
        else {
            this.partObjectSelected(this.uiStatusService.commodityPart, false);
        }
        this.uiStatusService.materialsVisible = false;
        this._selectedMaterialVisible = false;
        this._tagAndQuantityVisible = false;
        this.commodityCodeToBeFound = "";
        this.materialLoadingError = "";
        this.materialLoadingError = "";
        console.log("add-position.component -- partObjectSelected -- this._tagAndQuantityVisible: " + this._tagAndQuantityVisible.toString()); //TODO: remove
    };
    AddPositionComponent.prototype.resetPart = function () {
        this.changeGroup();
        this.parts = new Array();
    };
    AddPositionComponent.prototype.changeGroup = function () {
        this._selectedMaterialVisible = false || this._isEdit;
        this._tagAndQuantityVisible = false || this._isEdit;
        this.materials = new Array();
        this.materialLoadingError = "";
        this.uiStatusService.materialsVisible = false;
        this.uiStatusService.tablesAndSizesVisible = false;
        console.log("add-position.component -- changeGroup -- this._tagAndQuantityVisible: " + this._tagAndQuantityVisible.toString()); //TODO: remove
        if (!this._isEdit) {
            this.resetPositionModel();
            this.resetMaterialDetails();
        }
    };
    AddPositionComponent.prototype.editPositionByObject = function (positionToEdit) {
        var _this = this;
        this.resetPosition();
        this._tagAndQuantityVisible = true;
        this.commodityCodeToBeFound = "";
        this.materialLoadingError = "";
        this._isEdit = true;
        this._isTag = positionToEdit.isTwm;
        this.position = this.clonePosition(positionToEdit);
        this.selectedMaterial.id = positionToEdit.materialId;
        this.selectedMaterial.groupCode = positionToEdit.groupCode;
        this.selectedMaterial.partCode = positionToEdit.partCode;
        this.selectedMaterial.partId = positionToEdit.partId;
        this.selectedMaterial.commodityCode = positionToEdit.commodityCode;
        this.selectedMaterial.description = positionToEdit.description;
        this.selectedMaterial.description2 = positionToEdit.description2;
        this.selectedMaterial.unit = positionToEdit.unit;
        this.setAttributes(positionToEdit.attributes);
        if (!positionToEdit.isTwm) {
            setTimeout(function () { return _this.materialService.getSingle(positionToEdit.materialId, positionToEdit.partId); }, 100);
        }
        console.log("add-position.component -- editPositionByObject -- this._tagAndQuantityVisible: " + this._tagAndQuantityVisible.toString()); //TODO: remove
    };
    AddPositionComponent.prototype.clonePosition = function (positionToEdit) {
        console.log("add-position.component -- clonePosition -- positionToEdit.id: " + positionToEdit.id.toString()); //TODO: remove
        var clonedPosition = new bom_position_1.BomPosition();
        clonedPosition.attributes = this.clonePositionAttributes(positionToEdit.attributes);
        clonedPosition.commodityCode = positionToEdit.commodityCode;
        clonedPosition.description = positionToEdit.description;
        clonedPosition.description2 = positionToEdit.description2;
        clonedPosition.groupCode = positionToEdit.groupCode;
        clonedPosition.id = positionToEdit.id;
        clonedPosition.isTwm = positionToEdit.isTwm;
        clonedPosition.materialId = positionToEdit.materialId;
        clonedPosition.nodeId = positionToEdit.nodeId;
        clonedPosition.partCode = positionToEdit.partCode;
        clonedPosition.partId = positionToEdit.partId;
        clonedPosition.quantity = positionToEdit.quantity;
        clonedPosition.tag = positionToEdit.tag;
        clonedPosition.unit = positionToEdit.unit;
        return clonedPosition;
    };
    AddPositionComponent.prototype.clonePositionAttributes = function (attributesToClone) {
        var _this = this;
        var clonedAttributes = new Array();
        if (!!attributesToClone) {
            attributesToClone.forEach(function (a) { return clonedAttributes.push(_this.cloneAttributeValue(a)); });
        }
        return clonedAttributes;
    };
    AddPositionComponent.prototype.cloneAttributeValue = function (attributeToClone) {
        return new position_attribute_value_1.PositionAttributeValue(attributeToClone.attribute, attributeToClone.value);
    };
    AddPositionComponent.prototype.setAttributes = function (attributes) {
        var identifier;
        if (attributes != null) {
            var index;
            for (index = 0; index < attributes.length; index += 1) {
                this.attributeValues[attributes[index].attribute.id] = attributes[index].value;
            }
        }
    };
    AddPositionComponent.prototype.resetMaterial = function () {
        this.selectedMaterial = new material_1.Material(0, "", "", 0, "", "", "", "");
        this.resetMaterialDetails();
    };
    AddPositionComponent.prototype.resetMaterialDetails = function () {
        this.selectedMaterial.partCode = "";
        this.selectedMaterial.commodityCode = "";
        this.selectedMaterial.description = "";
        this.selectedMaterial.description2 = "";
        this._description2Keypress = false;
        this.selectedMaterial.unit = "";
        this.attributeValues = new Array();
        this.errorMessage = "";
        this.tagError = false;
    };
    AddPositionComponent.prototype.resetPositionModel = function () {
        this.position = new bom_position_1.BomPosition();
        this.position.nodeId = this.selectorService.lastSelectedNode.id;
    };
    AddPositionComponent.prototype.selectMaterial = function (materialId, idx) {
        var _this = this;
        this.highlightSelectedRow(idx);
        this.selectedMaterial = this.selectMaterialFromCache(materialId);
        this._selectedMaterialVisible = true;
        this._tagAndQuantityVisible = true;
        var newPosition = new bom_position_1.BomPosition();
        newPosition.id = 0;
        newPosition.materialId = this.selectedMaterial.id;
        newPosition.groupCode = this.selectedMaterial.groupCode;
        newPosition.partCode = this.selectedMaterial.partCode;
        newPosition.partId = this.selectedMaterial.partId;
        newPosition.commodityCode = this.selectedMaterial.commodityCode;
        newPosition.description = this.selectedMaterial.description;
        newPosition.description2 = this.selectedMaterial.description2;
        newPosition.unit = this.selectedMaterial.unit;
        newPosition.nodeId = this.position.nodeId;
        newPosition.attributes = new Array();
        this.addedPositions.push(new position_input_1.PositionInput(newPosition, new Array()));
        setTimeout(function () {
            var elm = document.getElementById("POSQTY" + (_this.addedPositions.length - 1).toString());
            if (!!elm) {
                elm.focus();
            }
        }, 350);
        var body = document.body, html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        console.log("add-position.component -- selectMaterial -- height(02): " + height.toString()); //TODO: Remove
        var resetButton = document.getElementById("btn-reset");
        this.scrollDown(resetButton);
        console.log("add-position.component -- selectMaterial -- window.scrollY.toString(): " + window.scrollY.toString()); //TODO: remove
    };
    AddPositionComponent.prototype.highlightSelectedRow = function (selectedIdx) {
        var idx = 0;
        var element = document.getElementById("CCROW" + idx.toString());
        var foundRow = !!element;
        while (foundRow) {
            element.className = "";
            idx += 1;
            element = document.getElementById("CCROW" + idx.toString());
            foundRow = !!element;
        }
        element = document.getElementById("CCROW" + selectedIdx.toString());
        element.className = "commodityCodeSelected";
    };
    AddPositionComponent.prototype.scrollDown = function (element) {
        if (!!element.parentElement) {
            console.log("add-position.component -- scrollDown -- element.parentElement.nodeName.toUpperCase(): " + element.parentElement.nodeName.toUpperCase()); //TODO: remove
            if (element.parentElement.nodeName.toUpperCase() === "MODAL") {
                this._scrollPrevious = 0;
                this.scrollDownAnimated(element.parentElement);
                //element.parentElement.scrollTop += 50;
                console.log("add-position.component -- scrollDown -- element.parentElement.scrollTop.toString(): " + element.parentElement.scrollTop.toString()); //TODO: remove
            }
            this.scrollDown(element.parentElement);
        }
    };
    AddPositionComponent.prototype.scrollDownAnimated = function (element) {
        var _this = this;
        var step = Math.max(Math.round((element.scrollHeight - element.scrollTop) / 30.0), 1);
        console.log("add-position.component -- scrollDownAnimated -- element.height.toString(): " + element.scrollHeight.toString()); //TODO: remove
        console.log("add-position.component -- scrollDownAnimated -- step.toString(): " + step.toString()); //TODO: remove
        element.scrollTop += step;
        console.log("add-position.component -- scrollDownAnimated -- element.scrollTop.toString(): " + element.scrollTop.toString()); //TODO: remove
        console.log("add-position.component -- scrollDownAnimated -- this._scrollPrevious.toString(): " + this._scrollPrevious.toString()); //TODO: remove
        if (element.scrollTop > this._scrollPrevious) {
            this._scrollPrevious = element.scrollTop;
            setTimeout(function () { _this.scrollDownAnimated(element); }, 30);
        }
    };
    AddPositionComponent.prototype.selectMaterialFromCache = function (materialId) {
        var foundMaterial = new material_1.Material(0, "", "", 0, "", "", "", "");
        for (var materialIndex = 0; materialIndex < this.materials.length; materialIndex += 1) {
            if (this.materials[materialIndex].id === materialId) {
                foundMaterial = this.materials[materialIndex];
            }
        }
        return foundMaterial;
    };
    AddPositionComponent.prototype.savePosition = function () {
        this.errorMessage = "";
        this._savedCount = 0;
        this._saveFailedCount = 0;
        if (this._isEdit || this._isTag) {
            this.saveSinglePosition();
        }
        else {
            this.savePositionList();
        }
    };
    AddPositionComponent.prototype.saveSinglePosition = function () {
        var _this = this;
        var newPosition = new bom_position_1.BomPosition();
        newPosition.id = this.position.id;
        if (!this._isEdit) {
            newPosition.id = 0;
        }
        newPosition.materialId = this.selectedMaterial.id;
        newPosition.groupCode = this.selectedMaterial.groupCode;
        newPosition.partCode = this.selectedMaterial.partCode;
        newPosition.partId = this.selectedMaterial.partId;
        newPosition.commodityCode = this.selectedMaterial.commodityCode;
        newPosition.description = this.selectedMaterial.description;
        newPosition.description2 = this.selectedMaterial.description2;
        newPosition.unit = this.selectedMaterial.unit;
        newPosition.isTwm = this._isTag;
        newPosition.nodeId = this.position.nodeId;
        newPosition.tag = this.position.tag;
        newPosition.quantity = this.position.quantity;
        newPosition.attributes = this.getAttributeValues();
        if (this._isEdit) {
            console.log("add-position.component -- saveSinglePosition -- Editing position"); //TODO: remove
            this.positionService.editPosition(newPosition).subscribe(function (p) {
                console.log("add-position.component -- saveSinglePosition -- Position successfully edited"); //TODO: remove
                _this.selectorService.refreshNode();
                _this.modalComponent.dismiss();
            }, function (e) {
                console.log("add-position.component -- saveSinglePosition -- Edit failed "); //TODO: remove
                _this.errorMessage = e.message;
            });
        }
        else {
            this.positionService.addPosition(newPosition)
                .subscribe(function (p) {
                _this.selectorService.refreshNode();
                if (!_this._isTag) {
                    _this.modalComponent.dismiss();
                }
                else {
                    _this.clearTag();
                }
            }, function (e) {
                _this.errorMessage = e.message;
                if (_this.errorMessage === "Duplicated Tag") {
                    _this.tagError = true;
                }
            });
        }
    };
    AddPositionComponent.prototype.clearTag = function () {
        this.selectedMaterial.id = 0;
        this.selectedMaterial.commodityCode = "";
        this.selectedMaterial.description = "";
        this.selectedMaterial.description2 = "";
        this.selectedMaterial.unit = "";
        this.position.tag = "";
        this.position.quantity = null;
        this.clearAttributeValues();
        this._description2Keypress = false;
    };
    AddPositionComponent.prototype.savePositionList = function () {
        var _this = this;
        this.clearErrorMessages();
        var addedBomPositions = new Array();
        var loopPosition;
        var newPosition;
        var index;
        for (index = 0; index < this.addedPositions.length; index += 1) {
            newPosition = new bom_position_1.BomPosition();
            newPosition.id = 0;
            newPosition.materialId = this.addedPositions[index].bomPosition.materialId;
            newPosition.groupCode = this.addedPositions[index].bomPosition.groupCode;
            newPosition.partCode = this.addedPositions[index].bomPosition.partCode;
            newPosition.partId = this.addedPositions[index].bomPosition.partId;
            newPosition.commodityCode = this.addedPositions[index].bomPosition.commodityCode;
            newPosition.description = this.addedPositions[index].bomPosition.description;
            newPosition.description2 = this.addedPositions[index].bomPosition.description2;
            newPosition.unit = this.addedPositions[index].bomPosition.unit;
            newPosition.isTwm = false;
            newPosition.nodeId = this.position.nodeId;
            newPosition.tag = this.addedPositions[index].bomPosition.tag;
            newPosition.quantity = this.addedPositions[index].bomPosition.quantity;
            newPosition.attributes = this.fetchAttributesFromArray(this.addedPositions[index].attributes);
            addedBomPositions.push(newPosition);
        }
        this.positionService.addPositionList(addedBomPositions)
            .subscribe(function (result) {
            _this._savedCount = _this.addedPositions.length;
            _this.checkAllPositionSaved();
        }, function (result) {
            _this.errorMessage = result.message;
            _this.setDetailErrorMessages(_this.parseErrorMessages(result.errorObject));
        });
    };
    AddPositionComponent.prototype.parseErrorMessages = function (errorMessages) {
        var result = new Array();
        var loopMessage;
        var newMessage;
        for (var _i = 0, errorMessages_1 = errorMessages; _i < errorMessages_1.length; _i++) {
            loopMessage = errorMessages_1[_i];
            newMessage = new position_error_1.PositionError();
            newMessage.index = loopMessage.index;
            newMessage.message = loopMessage.message;
            result.push(newMessage);
        }
        return result;
    };
    AddPositionComponent.prototype.setDetailErrorMessages = function (errorMessages) {
        var loopMessage;
        for (var _i = 0, errorMessages_2 = errorMessages; _i < errorMessages_2.length; _i++) {
            loopMessage = errorMessages_2[_i];
            this.addedPositions[loopMessage.index].errorMessage = loopMessage.message;
        }
    };
    AddPositionComponent.prototype.clearErrorMessages = function () {
        this.errorMessage = "";
        if (this.addedPositions) {
            var position;
            for (var _i = 0, _a = this.addedPositions; _i < _a.length; _i++) {
                position = _a[_i];
                position.errorMessage = null;
            }
        }
    };
    AddPositionComponent.prototype.savePositionInArray = function (index) {
        var _this = this;
        var newPosition = new bom_position_1.BomPosition();
        newPosition.id = 0;
        newPosition.materialId = this.addedPositions[index].bomPosition.materialId;
        newPosition.groupCode = this.addedPositions[index].bomPosition.groupCode;
        newPosition.partCode = this.addedPositions[index].bomPosition.partCode;
        newPosition.partId = this.addedPositions[index].bomPosition.partId;
        newPosition.commodityCode = this.addedPositions[index].bomPosition.commodityCode;
        newPosition.description = this.addedPositions[index].bomPosition.description;
        newPosition.description2 = this.addedPositions[index].bomPosition.description2;
        newPosition.unit = this.addedPositions[index].bomPosition.unit;
        newPosition.isTwm = false;
        newPosition.nodeId = this.position.nodeId;
        newPosition.tag = this.addedPositions[index].bomPosition.tag;
        newPosition.quantity = this.addedPositions[index].bomPosition.quantity;
        newPosition.attributes = this.fetchAttributesFromArray(this.addedPositions[index].attributes);
        this.positionService.addPosition(newPosition)
            .subscribe(function (p) {
            _this.addedPositions[index].saved = true;
            _this._savedCount += 1;
            _this.checkAllPositionSaved();
        }, function (e) {
            _this.addedPositions[index].saveFailed = true;
            _this._saveFailedCount += 1;
            if (_this.errorMessage && _this.errorMessage.length > 0) {
                _this.errorMessage += " - ";
            }
            _this.errorMessage += e.message;
            if (e.message === "Duplicated Tag") {
                _this.addedPositions[index].tagError = true;
            }
        });
    };
    AddPositionComponent.prototype.checkAllPositionSaved = function () {
        if (!(this.addedPositions) || this._savedCount === this.addedPositions.length) {
            this.selectorService.refreshNode();
            this.modalComponent.dismiss();
            return;
        }
        if (this._toBeSavedIndex < this.addedPositions.length - 1) {
            this._toBeSavedIndex += 1;
            this.savePositionInArray(this._toBeSavedIndex);
        }
        else {
            this.purgeSavedPositions();
        }
    };
    AddPositionComponent.prototype.purgeSavedPositions = function () {
        var purgedCount = 0;
        var index = 0;
        while (index < this.addedPositions.length) {
            if (this.addedPositions[index].saved) {
                this.addedPositions.splice(index, 1);
            }
            else {
                this.addedPositions[index].saveFailed = false;
                index += 1;
            }
        }
    };
    AddPositionComponent.prototype.fetchAttributesFromArray = function (attributeArray) {
        var result = new Array();
        var i;
        for (i = 0; i < attributeArray.length; i += 1) {
            if (attributeArray[i] != null) {
                result.push(new position_attribute_value_1.PositionAttributeValue(this.getPositionAttribute(i), attributeArray[i]));
            }
        }
        return result;
    };
    AddPositionComponent.prototype.getAttributeValues = function () {
        var result = new Array();
        var i;
        var keys = Object.keys(this.attributeValues);
        for (i = 0; i < keys.length; i += 1) {
            console.log("add-position.component -- getAttributeValues -- keys[i]: " + keys[i]);
            console.log("add-position.component -- getAttributeValues -- this.attributeValues[keys[i]]: " + this.attributeValues[keys[i]]);
            var attribute = this.getPositionAttribute(+keys[i]);
            result.push(new position_attribute_value_1.PositionAttributeValue(attribute, this.attributeValues[keys[i]]));
        }
        return result;
    };
    AddPositionComponent.prototype.clearAttributeValues = function () {
        var i;
        var keys = Object.keys(this.attributeValues);
        for (i = 0; i < keys.length; i += 1) {
            this.attributeValues[keys[i]] = "";
        }
    };
    AddPositionComponent.prototype.getPositionAttribute = function (id) {
        var result = null;
        var i;
        console.log("add-position.component -- getPositionAttribute -- id: " + id);
        console.log("add-position.component -- getPositionAttribute -- this.attributes.length: " + this.attributes.length);
        for (i = 0; i < this.attributes.length; i += 1) {
            console.log("add-position.component -- getPositionAttribute -- this.attributes[i].id: " + this.attributes[i].id);
            if (this.attributes[i].id == id) {
                result = this.attributes[i];
            }
        }
        return result;
    };
    AddPositionComponent.prototype.description2KeyPress = function () {
        this._description2Keypress = true;
    };
    AddPositionComponent.prototype.descriptionChanged = function () {
        if (!this._description2Keypress) {
            this.selectedMaterial.description2 = this.selectedMaterial.description;
        }
    };
    AddPositionComponent.prototype.savePositionLabel = function () {
        return this._isEdit ? "Save" : "Add";
    };
    AddPositionComponent.prototype.tagChanged = function (index) {
        if (this.addedPositions && this.addedPositions[index]) {
            this.addedPositions[index].tagError = false;
        }
    };
    AddPositionComponent.prototype.positionHasError = function (position) {
        if (!(position.errorMessage)) {
            return false;
        }
        return position.errorMessage.length > 0;
    };
    AddPositionComponent.prototype.propagateAttrValues = function (index) {
        if (index) {
            var i;
            for (i = 0; i < this.addedPositions[index - 1].attributes.length; i += 1) {
                if (this.addedPositions[index - 1].attributes[i] != null) {
                    this.addedPositions[index].attributes[i] = this.addedPositions[index - 1].attributes[i];
                }
            }
        }
    };
    AddPositionComponent.prototype.cancelLabel = function () {
        if (this._isTag && !this._isEdit) {
            return "Back to BoM";
        }
        return "Cancel";
    };
    AddPositionComponent.prototype.dismissModal = function () {
        this.modalComponent.dismiss();
    };
    AddPositionComponent.prototype.cleanupModal = function () {
        if (!!this.selectorService.lastSelectedNode && !!this.selectorService.lastSelectedNode.commodityGroup) {
            this.uiStatusService.commodityGroup = this.selectorService.lastSelectedNode.commodityGroup;
        }
        else {
            this.uiStatusService.commodityGroup = new commodity_group_1.CommodityGroup(0, "", "");
        }
        if (!!this.selectorService.lastSelectedNode && !!this.selectorService.lastSelectedNode.commodityPart) {
            this.uiStatusService.commodityPart = this.selectorService.lastSelectedNode.commodityPart;
        }
        else {
            this.uiStatusService.commodityPart = new commodity_part_1.CommodityPart(0, "", "", this.uiStatusService.commodityGroup.code);
        }
    };
    AddPositionComponent.prototype.findCommodityCode = function () {
        var _this = this;
        this.uiStatusService.materialsVisible = true;
        this.uiStatusService.tablesAndSizesVisible = true;
        this.filteredMaterialsLoading = true;
        this._loadingTimeoutExpired = false;
        this.materials = new Array();
        this.materialLoadingError = "";
        setTimeout(function () { return _this._loadingTimeoutExpired = true; }, 1000);
        if (!!this.uiStatusService.commodityPart && this.uiStatusService.commodityPart.id > 0) {
            this.materialService.getByCommodityCodeAndPart(this.uiStatusService.disciplineId, this.uiStatusService.commodityPart.id, this.commodityCodeToBeFound);
        }
        else {
            this.materialService.getByCommodityCode(this.uiStatusService.disciplineId, this.commodityCodeToBeFound);
        }
    };
    AddPositionComponent.prototype.confirmTag = function () {
        var _this = this;
        this.positionService.getTag(this.position.tag, this.uiStatusService.projectDisciplineId)
            .subscribe(function (tagPositions) {
            if (!!tagPositions && !!tagPositions[0]) {
                _this.selectedMaterial.description = tagPositions[0].description;
                _this.selectedMaterial.description2 = tagPositions[0].description2;
            }
            _this._tagStep2 = true;
        });
    };
    AddPositionComponent.prototype.pageChanged = function (pageNumber) {
        var _this = this;
        this.uiStatusService.materialsVisible = true;
        this.filteredMaterialsLoading = true;
        var filter = this.getFilter();
        this.materials = new Array();
        this.materialLoadingError = "";
        this._loadingTimeoutExpired = false;
        setTimeout(function () { return _this._loadingTimeoutExpired = true; }, (pageNumber + 10) * 1000);
        this.materialService.getAll(this.uiStatusService.commodityPart.id, filter, pageNumber, 10);
    };
    return AddPositionComponent;
}());
__decorate([
    core_1.ViewChild(modal_1.ModalComponent),
    __metadata("design:type", modal_1.ModalComponent)
], AddPositionComponent.prototype, "modalComponent", void 0);
__decorate([
    core_1.ViewChild(select_component_1.SelectComponent),
    __metadata("design:type", select_component_1.SelectComponent)
], AddPositionComponent.prototype, "selectComponent", void 0);
AddPositionComponent = __decorate([
    core_1.Component({
        selector: "addposition",
        templateUrl: "app/fill-bom/add-position.component.html",
        styleUrls: ["app/fill-bom/add-position.component.css"]
    }),
    __metadata("design:paramtypes", [ui_status_service_1.UiStatusService, commodity_group_service_1.CommodityGroupService,
        commodity_part_service_1.CommodityPartService, commodity_table_service_1.CommodityTableService,
        material_service_1.MaterialService, node_selector_service_1.NodeSelectorService,
        position_service_1.PositionService, attribute_service_1.AttributeService,
        allowed_value_service_1.AllowedValueService])
], AddPositionComponent);
exports.AddPositionComponent = AddPositionComponent;
//# sourceMappingURL=add-position.component.js.map