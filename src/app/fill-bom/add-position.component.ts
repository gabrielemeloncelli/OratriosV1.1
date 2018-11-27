import {
    Component,
    OnInit,
    ViewChild,
    ViewChildren,
    AfterViewInit,
    QueryList
} from '@angular/core';
import { Option } from 'ng-select/dist/option';
import { SelectComponent } from 'ng-select/dist/select.component';

import { UiStatusService } from '../core/ui-status.service';
import { ModalComponent } from '../ng2-bs3-modal/components/modal';
import { CommodityGroup } from './commodity-group';
import { CommodityGroupService } from './commodity-group.service';
import { CommodityPart } from './commodity-part';
import { CommodityPartService } from './commodity-part.service';
import { MappedTable } from './mapped-table';
import { CommodityTableService } from './commodity-table.service';
import { Material } from './material';
import { MaterialService } from './material.service';
import { TableAndSizeFilter } from './table-and-size-filter';
import { TableFilter } from './table-filter';
import { BomPosition } from './bom-position';
import { NodeSelectorService } from './node-selector.service';
import { PositionService } from './position.service';
import { CommodityTable } from './commodity-table';
import { AttributeService } from './attribute.service';
import { Attribute } from './attribute';
import { PositionAttributeValue } from './position-attribute-value';
import { PositionInput } from './position-input';
import { PositionError } from './position-error';
import { AllowedValue } from './allowed-value';
import { AllowedValueService } from './allowed-value.service';

enum ResearchType {
    Property = 1,
    Commodity
}


@Component({
    selector: 'mbe-addposition',
    templateUrl: 'add-position.component.html',
    styleUrls: ['add-position.component.css']
})
export class AddPositionComponent implements OnInit, AfterViewInit {


    @ViewChild('addComp') modalComponent: ModalComponent;
    public groups: Option[] = new Array<Option>();
    public groupsDisabled = false;
    public parts: Option[] = new Array<Option>();
    public materials: Material[] = new Array<Material>();
    public addedPositions: PositionInput[] = new Array<PositionInput>();
    tables = new Array<MappedTable>();
    private _tableFilters = new Array<TableFilter>();
    public position: BomPosition = new BomPosition();
    public selectedMaterial: Material = null;
    private _selectedMaterialVisible = false;
    private _tagAndQuantityVisible = false;
    private _isTag = false;
    private _description2Keypress = false;
    private _isEdit = false;
    public attributes: Attribute[];
    public attributeValues: string[];
    public attributeValuesLocked: boolean[];
    private _groups: CommodityGroup[];
    private _parts: CommodityPart[];
    public errorMessage: string;
    public tagError: boolean;
    private _savedCount: number;
    private _saveFailedCount: number;
    private _toBeSavedIndex: number;
    private _allowedUnits: Option[];
    public allowedValues = new Array<Option[]>();
    public hideGroup = false;
    public hidePart = false;
    public filteredMaterialsLoading = false;
    public commoditySelection = false;
    public materialLoadingError = '';
    public commodityCodeToBeFound: string;
    private _loadingTimeoutExpired = false;
    private _tagStep2 = false;
    private _commodityPropertiesSwitch = true;
    private _scrollPrevious: number;
    public hideTag: boolean;
    public totItems = 0;
    private _groupSelect: SelectComponent;
    private _partSelect: SelectComponent;
    private _lockedWbs: string;
    private _isWbsLocked: boolean;
    public isBusy: boolean = false;
    public wbsAttribute: Attribute = null;
    private _researchType: ResearchType;
    public _tagUnitLocked = false;




    @ViewChildren(SelectComponent)
    private selectComponents: QueryList<SelectComponent>;


    constructor(public uiStatusService: UiStatusService, private commodityGroupService: CommodityGroupService,
        private commodityPartService: CommodityPartService, private commodityTableService: CommodityTableService,
        private materialService: MaterialService, private selectorService: NodeSelectorService,
        private positionService: PositionService, private attributeService: AttributeService,
        private allowedValueService: AllowedValueService) {
        this._allowedUnits = new Array<Option>();
        this._allowedUnits.push(new Option({ value: 'U', label: 'U' }));
        this._allowedUnits.push(new Option({ value: 'M2', label: 'M2' }));
        this.resetMaterial();
        this.resetAddedPositions();

    }

    ngAfterViewInit() {
        this.uiStatusService.insertPosition.subscribe(
            detail => {
                if (detail.displayInsertPosition) {
                    this._isTag = detail.positionFromTag;
                    this._tagStep2 = false;
                    this._commodityPropertiesSwitch = !this._isTag;
                    this.resetPosition();
                    this.hideGroup = !!this.uiStatusService.commodityGroup.id;
                    this.hidePart = !!this.uiStatusService.commodityPart.id;
                    this.hideTag = detail.hideTag;
                    this._tagAndQuantityVisible = this.hideGroup && this.hidePart && this._isTag;
                    if (this.hideGroup) {
                        if (this.hidePart) {
                            this._parts = new Array<CommodityPart>();
                            this._parts.push(this.uiStatusService.commodityPart);
                            const partOption = new Option({
                                value: '' + this.uiStatusService.commodityPart.id,
                                label: '' + this.uiStatusService.commodityPart.id
                            });
                            this.partSelected(partOption);
                        } else {
                            const groupOption = new Option({
                                value: '' + this.uiStatusService.commodityGroup.id,
                                label: '' + this.uiStatusService.commodityGroup.id
                            });
                            this.groupSelected(groupOption);
                        }
                    }
                    setTimeout(() => this.modalComponent.open('fs'), 200);
                }
            }
        );
        this.uiStatusService.editPositionObservable.subscribe(
            position => {
                if (position) {
                    this._isTag = position.isTwm;
                    this._tagStep2 = true;
                    this._commodityPropertiesSwitch = true;
                    this.editPositionByObject(position);
                    setTimeout(() => this.modalComponent.open('fs'), 200);
                }
            }
        );
        this.attributeService.attributes.subscribe(
            attributes => {
                this.uiStatusService.attributes = attributes;
                this.attributes = attributes;
                for (const attribute of attributes) {
                    this.allowedValues[attribute.spmatId] = new Array<Option>();
                    this.allowedValueService.getAll(attribute.spmatId)
                        .subscribe(v => {
                            if (true && v && v.length > 0) {
                                const index = v[0].attributeId;
                                this.allowedValues[index] = v.map(v1 => new Option({
                                    value: v1.value,
                                    label: v1.value
                                }));
                            }

                        });
                }
                this.wbsAttribute = this.getWbsAttribute();
            }
        );
        this.attributeService.getAll(this.uiStatusService.projectDisciplineId);
        if (!!this.uiStatusService.commodityGroup) {
            this.selectedMaterial.groupCode = this.uiStatusService.commodityGroup.code;
            if (!!this.uiStatusService.commodityPart.id) {
                this.partObjectSelected(this.uiStatusService.commodityPart, false);
            }
        }
    }


    ngOnInit() {
        this.commodityGroupService.groups.subscribe(
            (groups: CommodityGroup[]) => {
                this.groups = groups.map(g => new Option({
                    value: g.id.toString(),
                    label: g.code + ' - ' + g.description
                }));
                this._groups = groups;
            }
        );

        this.commodityPartService.parts.subscribe(
            (parts: CommodityPart[]) => {
                this.parts = parts.map(p => new Option({
                    value: p.id.toString(),
                    label: p.code + ' - ' + p.description
                }));
                this._parts = parts;
                this.changeGroup();
            }
        );

        this.commodityTableService.tables.subscribe(
            (tables: CommodityTable[]) => {
                setTimeout(() => this.uiStatusService.tablesAndSizesVisible = (this.selectedMaterial.partCode !== ''), 100);
                this.tables = tables.map(t => new MappedTable(t));

            }
        );

        this.materialService.materials.subscribe(
            (materials: Material[]) => {
                if (this._loadingTimeoutExpired) {
                    this.filteredMaterialsLoading = false;
                } else {
                    setTimeout(() => this.filteredMaterialsLoading = false, 500);
                }
                this.materials = materials;
                this.materialLoadingError = '';
                if (materials.length === 0) {
                    this.materialLoadingError = 'No material found.';
                }
                if (this._isEdit && this.materials.length > 0) {
                    this.selectedMaterial = this.materials[0];
                }
            }
        );

        this.materialService.totalItems.subscribe(
            totalItems => {
                this.totItems = this.totItems == 0 ? 1 : 0;
                if (totalItems == 0) {
                    this.filteredMaterialsLoading = false;
                    this.materialLoadingError = 'No material found.';
                } else if (!this._loadingTimeoutExpired) {
                    this.materialLoadingError = '';
                }
                setTimeout(() => {
                    this.totItems = totalItems;
                }, 500);
            }
        );

        this.modalComponent.onDismiss.subscribe(() => this.cleanupModal());




    }


    removed(event: any) { }

    typed(event: any) { }

    groupSelected(event: any) {
        const foundGroup: CommodityGroup = this.findSelectedGroup(+event.value);
        this.resetPart();
        this.selectedMaterial.partCode = null;
        this.uiStatusService.PART_CODE = null;
        this.selectedMaterial.groupCode = foundGroup.code;
        this.uiStatusService.commodityGroup = foundGroup;
        this.uiStatusService.commodityPart = new CommodityPart(0, '', '', foundGroup.code);
        this.commodityPartService.getAll(foundGroup.id);
    }

    findSelectedGroup(id: number): CommodityGroup {
        let result: CommodityGroup = null;
        let i: number;
        for (i = 0; i < this._groups.length; i += 1) {
            if (this._groups[i].id === id) {
                result = this._groups[i];
            }
        }
        return result;
    }

    partSelected(event: Option) {
        const foundPart: CommodityPart = this.findSelectedPart(+event.value);
        this.partObjectSelected(foundPart, true);
    }

    partObjectSelected(selectedPart: CommodityPart, updateUiStatusService: boolean) {
        this.tables = new Array<MappedTable>();
        this._tableFilters = new Array<TableFilter>();
        this.resetPositionModel();
        this.resetMaterial();
        this.materials = new Array<Material>();
        this.materialLoadingError = '';
        this.selectedMaterial.partId = selectedPart.id;
        this.selectedMaterial.partCode = selectedPart.code;
        this._selectedMaterialVisible = false;
        this.uiStatusService.materialsVisible = false;
        if (updateUiStatusService) {
            this.uiStatusService.commodityPart = selectedPart;
        }

        if (this._isTag) {
            this._tagAndQuantityVisible = true;
        } else {
            this.commodityTableService.getAll(this.uiStatusService.disciplineCode, selectedPart.groupCode, selectedPart.code);
        }
    }

    findSelectedPart(id: number): CommodityPart {
        let result: CommodityPart = null;
        let i: number;
        for (i = 0; i < this._parts.length; i += 1) {
            if (this._parts[i].id === id) {
                result = this._parts[i];
            }
        }
        return result;
    }

    tableSelected(event: Option, tableName: string) {
        let foundFilter: TableFilter = null;
        for (let tableIndex = 0; tableIndex < this._tableFilters.length; tableIndex += 1) {
            if (this._tableFilters[tableIndex].tableName === tableName) {
                foundFilter = this._tableFilters[tableIndex];
            }
        }
        if (!foundFilter) {
            foundFilter = new TableFilter(tableName, event.value);
            this._tableFilters.push(foundFilter);
        } else {
            foundFilter.detail = event.value;
        }
    }

    findMaterial() {
        this._researchType = ResearchType.Property;
        this.uiStatusService.materialsVisible = true;
        this.filteredMaterialsLoading = true;
        const filter = this.getFilter();
        this.materials = new Array<Material>();
        this.materialLoadingError = '';
        this._loadingTimeoutExpired = false;
        setTimeout(() => this._loadingTimeoutExpired = true, 1000);
        this.materialService.getAllCount(this.uiStatusService.commodityPart.id, filter);
    }

    getFilter(): TableAndSizeFilter {
        const tableFilters: TableFilter[] = new Array<TableFilter>();
        for (let tableIndex = 0; tableIndex < this._tableFilters.length; tableIndex += 1) {
            tableFilters.push(new TableFilter(this._tableFilters[tableIndex].tableName, this._tableFilters[tableIndex].detail));
        }
        return new TableAndSizeFilter(tableFilters);
    }

    tableRemoved(tableName: string) {
        const foundFilterPosition = this.findFilterPosition(tableName);
        if (foundFilterPosition > -1) {
            this._tableFilters.splice(foundFilterPosition, 1);
        }
    }

    unitRemoved() {
        this.selectedMaterial.unit = '';
    }

    unitSelected(option: Option) {
        if (option) {
            this.selectedMaterial.unit = option.value;
        }
    }

    findFilterPosition(tableName: string): number {
        let foundIndex = -1;
        for (let loopIndex = 0; loopIndex < this._tableFilters.length; loopIndex += 1) {
            if (this._tableFilters[loopIndex].tableName === tableName) {
                foundIndex = loopIndex;
            }
        }
        return foundIndex;
    }

    onSubmit() {
    }

    resetTest() {

    }
    resetPosition() {
        this._isEdit = false;
        this.resetAddedPositions();
        this.resetGroupAndPart();
        if (!this.uiStatusService.commodityPart.id) {
            this.commodityPartService.getAll(-1);
        }
    }

    resetAddedPositions() {
        this.addedPositions = new Array<PositionInput>();
    }

    resetGroupAndPart() {
        // Refresh the list of the components when they are displayed
        this.getSelectComponents();
        if (this._groupSelect) {
            this._groupSelect.clear();
        }
        if (this._partSelect) {
            this._partSelect.clear();
        }

        if (!this.uiStatusService.commodityGroup.id) {
            this.uiStatusService.commodityGroup = new CommodityGroup(0, '', '');
        }
        if (!this.uiStatusService.commodityPart.id) {
            this.uiStatusService.commodityPart = new CommodityPart(0, '', '', '');
        }
        this.uiStatusService.tablesAndSizesVisible = false;
        this._tableFilters = new Array<TableFilter>();
        if (!this.uiStatusService.commodityPart.id) {
            this.resetPart();
        } else {
            this.partObjectSelected(this.uiStatusService.commodityPart, false);
        }
        this.uiStatusService.materialsVisible = false;
        this._selectedMaterialVisible = false;
        this._tagAndQuantityVisible = false;
        this.commodityCodeToBeFound = '';
        this.materialLoadingError = '';
        this.materialLoadingError = '';

    }

    resetPart() {
        this.changeGroup();
        // Refresh the list of the components when they are displayed
        this.getSelectComponents();
        if (this._partSelect) {
            this._partSelect.clear();
        }
        this.parts = new Array<Option>();
    }

    changeGroup() {
        this._selectedMaterialVisible = false || this._isEdit;
        this._tagAndQuantityVisible = false || this._isEdit;
        this.materials = new Array<Material>();
        this.materialLoadingError = '';
        this.uiStatusService.materialsVisible = false;
        this.uiStatusService.tablesAndSizesVisible = false;

        if (!this._isEdit) {
            this.resetPositionModel();
            this.resetMaterialDetails();
        }

    }


    editPositionByObject(positionToEdit: BomPosition) {
        this.resetPosition();
        this._tagAndQuantityVisible = true;
        this.commodityCodeToBeFound = '';
        this.materialLoadingError = '';
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
            setTimeout(() => this.materialService.getSingle(positionToEdit.materialId, positionToEdit.partId), 100);
        }


    }

    clonePosition(positionToEdit: BomPosition): BomPosition {
        const clonedPosition = new BomPosition();
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
    }

    clonePositionAttributes(attributesToClone: PositionAttributeValue[]): PositionAttributeValue[] {
        const clonedAttributes = new Array<PositionAttributeValue>();
        if (!!attributesToClone) {
            attributesToClone.forEach(a => clonedAttributes.push(this.cloneAttributeValue(a)));
        }
        return clonedAttributes;
    }

    cloneAttributeValue(attributeToClone: PositionAttributeValue): PositionAttributeValue {
        return new PositionAttributeValue(attributeToClone.attribute, attributeToClone.value, attributeToClone.locked);
    }


    setAttributes(attributes: PositionAttributeValue[]) {
        if (attributes != null) {
            let index: number;
            for (index = 0; index < attributes.length; index += 1) {
                this.attributeValues[attributes[index].attribute.id] = attributes[index].value;
                this.attributeValuesLocked[attributes[index].attribute.id] = attributes[index].locked;
            }
        }
    }


    resetMaterial() {
        this.selectedMaterial = new Material(0, '', '', 0, '', '', '', '');
        this.resetMaterialDetails();
    }

    resetMaterialDetails() {
        this.selectedMaterial.partCode = '';
        this.selectedMaterial.commodityCode = '';
        this.selectedMaterial.description = '';
        this.selectedMaterial.description2 = '';
        this._description2Keypress = false;
        this.selectedMaterial.unit = '';
        this.attributeValues = new Array<string>();
        this.attributeValuesLocked = new Array<boolean>();
        this.setLockedWbs();
        this.errorMessage = '';
        this.tagError = false;
        this._tagUnitLocked = false;
    }

    resetPositionModel() {
        this.position = new BomPosition();
        this.position.nodeId = this.selectorService.lastSelectedNode.id;
        this._lockedWbs = this.selectorService.lastSelectedNode.lockedWbs;
        this._isWbsLocked = this._lockedWbs != null && this._lockedWbs != '';
    }

    selectMaterial(materialId: number, idx: number) {
        this.highlightSelectedRow(idx);
        this.selectedMaterial = this.selectMaterialFromCache(materialId);
        this._selectedMaterialVisible = true;
        this._tagAndQuantityVisible = true;

        const newPosition: BomPosition = new BomPosition();
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
        newPosition.attributes = new Array<PositionAttributeValue>();





        const attributeValueArray: string[] = new Array<string>();
        const attributeValueLockedArray: boolean[] = new Array<boolean>();
        if (this._isWbsLocked && this.wbsAttribute != null && this.wbsAttribute.id > 0) {
            attributeValueArray[this.wbsAttribute.id] = this._lockedWbs;
            attributeValueLockedArray[this.wbsAttribute.id] = true;
        }

        this.addedPositions.push(new PositionInput(newPosition, attributeValueArray, attributeValueLockedArray));
        setTimeout(() => {
            const elm = document.getElementById('POSQTY' + (this.addedPositions.length - 1).toString());
            if (!!elm) {
                elm.focus();
            }
        }, 350);

        const body = document.body,
            html = document.documentElement;

        const height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        const resetButton = document.getElementById('btn-reset');

        this.scrollDown(resetButton);
    }

    highlightSelectedRow(selectedIdx: number) {
        let idx = 0;
        let element = document.getElementById('CCROW' + idx.toString());
        let foundRow = !!element;

        while (foundRow) {
            element.className = '';
            idx += 1;
            element = document.getElementById('CCROW' + idx.toString());
            foundRow = !!element;
        }
        element = document.getElementById('CCROW' + selectedIdx.toString());
        element.className = 'commodityCodeSelected';

    }

    scrollDown(element: any) {
        if (!!element.parentElement) {

            if (element.parentElement.nodeName.toUpperCase() === 'MODAL') {
                this._scrollPrevious = 0;
                this.scrollDownAnimated(element.parentElement);


            }
            this.scrollDown(element.parentElement);
        }
    }

    scrollDownAnimated(element: any): void {
        const step = Math.max(Math.round((element.scrollHeight - element.scrollTop) / 30.0), 1);
        element.scrollTop += step;
        if (element.scrollTop > this._scrollPrevious) {
            this._scrollPrevious = element.scrollTop;
            setTimeout(() => { this.scrollDownAnimated(element); }, 30);
        }
    }

    selectMaterialFromCache(materialId: number) {
        let foundMaterial = new Material(0, '', '', 0, '', '', '', '');
        for (let materialIndex = 0; materialIndex < this.materials.length; materialIndex += 1) {
            if (this.materials[materialIndex].id === materialId) {
                foundMaterial = this.materials[materialIndex];
            }
        }
        return foundMaterial;
    }
    savePosition() {
        this.errorMessage = '';
        this._savedCount = 0;
        this._saveFailedCount = 0;
        if (this._isEdit || this._isTag) {
            this.saveSinglePosition();
        } else {
            this.savePositionList();
        }
    }

    saveSinglePosition() {
        const newPosition: BomPosition = new BomPosition();
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
            this.positionService.editPosition(newPosition).subscribe(
                p => {
                    this.selectorService.refreshNode();
                    this.modalComponent.dismiss();
                },
                e => {
                    this.errorMessage = e.message;
                }
            );
        } else {
            this.positionService.addPosition(newPosition)
                .subscribe(
                    p => {
                        this.selectorService.refreshNode();
                        if (!this._isTag) {
                            this.modalComponent.dismiss();
                        } else {
                            this.clearTag();
                        }
                    },
                    e => {
                        this.errorMessage = e.message;
                        if (this.errorMessage === 'Duplicated Tag') {
                            this.tagError = true;
                        }
                    }
                )
                ;
        }

    }

    clearTag() {
        this.selectedMaterial.id = 0;
        this.selectedMaterial.commodityCode = '';
        this.selectedMaterial.description = '';
        this.selectedMaterial.description2 = '';
        this.selectedMaterial.unit = '';
        this.position.tag = '';
        this.position.quantity = null;
        this.clearAttributeValues();
        this._description2Keypress = false;
    }

    savePositionList() {
        this.isBusy = true;
        this.clearErrorMessages();
        const addedBomPositions = new Array<BomPosition>();
        let newPosition: BomPosition;
        let index: number;
        for (index = 0; index < this.addedPositions.length; index += 1) {
            newPosition = new BomPosition();
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

            newPosition.attributes = this.fetchAttributesFromArray(this.addedPositions[index].attributes, this.addedPositions[index].attributesLocked);

            addedBomPositions.push(newPosition);
        }
        this.positionService.addPositionList(addedBomPositions)
            .subscribe(result => {
                this.isBusy = false;
                this._savedCount = this.addedPositions.length;
                this.checkAllPositionSaved();
            },
                result => {
                    this.isBusy = false;
                    this.errorMessage = result.message;
                    this.setDetailErrorMessages(this.parseErrorMessages(result.errorObject));
                }
            );
    }

    parseErrorMessages(errorMessages: any[]): PositionError[] {
        const result = new Array<PositionError>();
        let loopMessage: any;
        let newMessage: PositionError;
        for (loopMessage of errorMessages) {
            newMessage = new PositionError();
            newMessage.index = loopMessage.index;
            newMessage.message = loopMessage.message;
            newMessage.link = loopMessage.link;
            result.push(newMessage);
        }
        return result;
    }

    setDetailErrorMessages(errorMessages: PositionError[]) {
        let loopMessage: PositionError;
        for (loopMessage of errorMessages) {
            this.addedPositions[loopMessage.index].errorMessage = loopMessage.message;
            this.addedPositions[loopMessage.index].link = loopMessage.link;
        }
    }

    clearErrorMessages() {
        this.errorMessage = '';
        if (this.addedPositions) {
            let position: PositionInput;
            for (position of this.addedPositions) {
                position.errorMessage = null;
            }
        }
    }

    savePositionInArray(index: number) {
        const newPosition: BomPosition = new BomPosition();
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

        newPosition.attributes = this.fetchAttributesFromArray(this.addedPositions[index].attributes, this.addedPositions[index].attributesLocked);

        this.positionService.addPosition(newPosition)
            .subscribe(
                p => {
                    this.addedPositions[index].saved = true;
                    this._savedCount += 1;
                    this.checkAllPositionSaved();
                },
                e => {
                    this.addedPositions[index].saveFailed = true;
                    this._saveFailedCount += 1;
                    if (this.errorMessage && this.errorMessage.length > 0) {
                        this.errorMessage += ' - ';
                    }
                    this.errorMessage += e.message;
                    if (e.message === 'Duplicated Tag') {
                        this.addedPositions[index].tagError = true;
                    }
                }
            );


    }

    checkAllPositionSaved(): void {
        if (!(this.addedPositions) || this._savedCount === this.addedPositions.length) {
            this.selectorService.refreshNode();
            this.modalComponent.dismiss();
            return;
        }
        if (this._toBeSavedIndex < this.addedPositions.length - 1) {
            this._toBeSavedIndex += 1;
            this.savePositionInArray(this._toBeSavedIndex);
        } else {
            this.purgeSavedPositions();
        }
    }

    purgeSavedPositions(): void {
        const purgedCount = 0;
        let index = 0;
        while (index < this.addedPositions.length) {
            if (this.addedPositions[index].saved) {
                this.addedPositions.splice(index, 1);
            } else {
                this.addedPositions[index].saveFailed = false;
                index += 1;
            }
        }
    }

    fetchAttributesFromArray(attributeArray: string[], attributeLockedArray: boolean[]): PositionAttributeValue[] {
        const result = new Array<PositionAttributeValue>();
        let i: number;
        for (i = 0; i < attributeArray.length; i += 1) {
            if (attributeArray[i] != null) {
                result.push(new PositionAttributeValue(this.getPositionAttribute(i), attributeArray[i], attributeLockedArray[i]));
            }
        }
        return result;
    }

    getAttributeValues(): PositionAttributeValue[] {
        const result = new Array<PositionAttributeValue>();
        let i: number;
        const keys = Object.keys(this.attributeValues);
        for (i = 0; i < keys.length; i += 1) {
            const attribute = this.getPositionAttribute(+keys[i]);
            result.push(new PositionAttributeValue(attribute, this.attributeValues[keys[i]], this.attributeValuesLocked[keys[i]]));
        }
        return result;
    }

    clearAttributeValues() {
        let i: number;
        const keys = Object.keys(this.attributeValues);
        for (i = 0; i < keys.length; i += 1) {
            if (!this.attributeValuesLocked[keys[i]]) {
                this.attributeValues[keys[i]] = '';
            }
        }
        this.setLockedWbs();
    }

    setLockedWbs() {
        if (this._isWbsLocked && this.wbsAttribute != null && this.wbsAttribute.id > 0) {
            this.attributeValues[this.wbsAttribute.id] = this._lockedWbs;
            this.attributeValuesLocked[this.wbsAttribute.id] = true;
        }
    }

    getPositionAttribute(id: number): Attribute {
        let result: Attribute = null;
        let i: number;
        for (i = 0; i < this.attributes.length; i += 1) {
            if (this.attributes[i].id === id) {
                result = this.attributes[i];
            }
        }
        return result;
    }

    description2KeyPress() {
        this._description2Keypress = true;
    }

    descriptionChanged() {
        if (!this._description2Keypress) {
            this.selectedMaterial.description2 = this.selectedMaterial.description;
        }
    }

    savePositionLabel(): string {
        return this._isEdit ? 'Save' : 'Add';
    }

    tagChanged(index: number): void {
        if (this.addedPositions && this.addedPositions[index]) {
            this.addedPositions[index].tagError = false;
        }
    }

    positionHasError(position: PositionInput): boolean {
        if (!(position.errorMessage)) {
            return false;
        }
        return position.errorMessage.length > 0;
    }

    propagateAttrValues(index: number): void {
        if (index) {
            let i: number;
            for (i = 0; i < this.addedPositions[index - 1].attributes.length; i += 1) {
                if (this.addedPositions[index - 1].attributes[i] != null) {
                    this.addedPositions[index].attributes[i] = this.addedPositions[index - 1].attributes[i];
                }
            }
        }
    }

    cancelLabel(): string {
        if (this._isTag && !this._isEdit) {
            return 'Back to BoM';
        }
        return 'Cancel';
    }

    dismissModal() {
        this.modalComponent.dismiss();
    }
    cleanupModal() {
        if (!!this.selectorService.lastSelectedNode && !!this.selectorService.lastSelectedNode.commodityGroup) {
            this.uiStatusService.commodityGroup = this.selectorService.lastSelectedNode.commodityGroup;
        } else {
            this.uiStatusService.commodityGroup = new CommodityGroup(0, '', '');
        }
        if (!!this.selectorService.lastSelectedNode && !!this.selectorService.lastSelectedNode.commodityPart) {
            this.uiStatusService.commodityPart = this.selectorService.lastSelectedNode.commodityPart;
        } else {
            this.uiStatusService.commodityPart = new CommodityPart(0, '', '', this.uiStatusService.commodityGroup.code);
        }
    }

    findCommodityCode() {
        this._researchType = ResearchType.Commodity;
        this.totItems = 1;
        this.uiStatusService.materialsVisible = true;
        this.uiStatusService.tablesAndSizesVisible = true;
        this.filteredMaterialsLoading = true;
        this._loadingTimeoutExpired = false;
        this.materials = new Array<Material>();
        this.materialLoadingError = '';
        setTimeout(() => this._loadingTimeoutExpired = true, 1000);
        if (!!this.uiStatusService.commodityPart && this.uiStatusService.commodityPart.id > 0) {
            this.materialService.getByCommodityCodeAndPart(this.uiStatusService.disciplineId,
                this.uiStatusService.commodityPart.id, this.commodityCodeToBeFound);
        } else {
            this.materialService.getByCommodityCode(this.uiStatusService.disciplineId, this.commodityCodeToBeFound);
        }
    }

    confirmTag() {
        this.positionService.getTag(this.position.tag, this.uiStatusService.projectDisciplineId)
            .subscribe(tagPositions => {
                this._tagUnitLocked = false;
                if (!!tagPositions && !!tagPositions[0]) {
                    this.selectedMaterial.description = tagPositions[0].description;
                    this.selectedMaterial.description2 = tagPositions[0].description2;
                    this.selectedMaterial.unit = tagPositions[0].unit;
                    this._tagUnitLocked = true;
                }
                this._tagStep2 = true;
                
            });
    }

    pageChanged(pageNumber: number) {
        if (this._researchType == ResearchType.Property) {
            this.uiStatusService.materialsVisible = true;
            this.filteredMaterialsLoading = true;
            const filter = this.getFilter();
            this.materials = new Array<Material>();
            this.materialLoadingError = '';
            this._loadingTimeoutExpired = false;
            setTimeout(() => this._loadingTimeoutExpired = true, (pageNumber + 10) * 1000);
            this.materialService.getAll(this.uiStatusService.commodityPart.id, filter, pageNumber, 10);
        }

    }

    getSelectComponents() {
        if (this.selectComponents) {
            this.selectComponents.forEach((component) => {
                if (component.placeholder === 'No group selected') {
                    this._groupSelect = component;
                }
                if (component.placeholder === 'No part selected') {
                    this._partSelect = component;
                }
            });
        }
    }

    getWbsAttribute(): Attribute {
        var result: Attribute;
        this.attributes.forEach(attr => {
            if (attr.code == "WBS") {
                result = attr;
            }
        });
        return result;
    }

    inlineTagChanged(newObj: any, index: number): void
     {
         this.addedPositions[index].bomPosition.tag = newObj.toString().toUpperCase();
     }

}
