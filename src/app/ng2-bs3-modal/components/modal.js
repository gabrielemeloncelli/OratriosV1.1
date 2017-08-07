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
var modal_instance_1 = require("./modal-instance");
var ModalComponent = (function () {
    function ModalComponent(element) {
        var _this = this;
        this.element = element;
        this.overrideSize = null;
        this.visible = false;
        this.animation = true;
        this.backdrop = true;
        this.keyboard = true;
        this.onClose = new core_1.EventEmitter(false);
        this.onDismiss = new core_1.EventEmitter(false);
        this.onOpen = new core_1.EventEmitter(false);
        this.instance = new modal_instance_1.ModalInstance(this.element);
        this.instance.hidden.subscribe(function (result) {
            _this.visible = _this.instance.visible;
            if (result === modal_instance_1.ModalResult.Dismiss)
                _this.onDismiss.emit(undefined);
        });
        this.instance.shown.subscribe(function () {
            _this.onOpen.emit(undefined);
        });
    }
    Object.defineProperty(ModalComponent.prototype, "fadeClass", {
        get: function () { return this.animation; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataKeyboardAttr", {
        get: function () { return this.keyboard; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataBackdropAttr", {
        get: function () { return this.backdrop; },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngOnDestroy = function () {
        return this.instance && this.instance.destroy();
    };
    ModalComponent.prototype.routerCanDeactivate = function () {
        return this.ngOnDestroy();
    };
    ModalComponent.prototype.open = function (size) {
        var _this = this;
        console.log("modal.ts -- open -- size: " + size); //TODO: remove
        console.log("modal.ts -- open -- this.overrideSize: " + this.overrideSize); //TODO: remove
        if (ModalSize.validSize(size))
            this.overrideSize = size;
        return this.instance.open().then(function () {
            _this.visible = _this.instance.visible;
        });
    };
    ModalComponent.prototype.close = function () {
        var _this = this;
        return this.instance.close().then(function () {
            _this.onClose.emit(undefined);
        });
    };
    ModalComponent.prototype.dismiss = function () {
        return this.instance.dismiss();
    };
    ModalComponent.prototype.isSmall = function () {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    };
    ModalComponent.prototype.isLarge = function () {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    };
    ModalComponent.prototype.isFullScreen = function () {
        return this.overrideSize === ModalSize.FullScreen;
    };
    return ModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "animation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "backdrop", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "keyboard", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalComponent.prototype, "size", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "onClose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "onDismiss", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "onOpen", void 0);
__decorate([
    core_1.HostBinding('class.fade'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ModalComponent.prototype, "fadeClass", null);
__decorate([
    core_1.HostBinding('attr.data-keyboard'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ModalComponent.prototype, "dataKeyboardAttr", null);
__decorate([
    core_1.HostBinding('attr.data-backdrop'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ModalComponent.prototype, "dataBackdropAttr", null);
ModalComponent = __decorate([
    core_1.Component({
        selector: 'modal',
        host: {
            'class': 'modal',
            'role': 'dialog',
            'tabindex': '-1'
        },
        template: "\n        <div class=\"modal-dialog\" [ngClass]=\"{ 'modal-sm': isSmall(), 'modal-lg': isLarge(), 'modal-dialog-fs': isFullScreen() }\">\n            <div class=\"modal-content\" [ngClass]=\"{ 'modal-content-fs': isFullScreen() }\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
        styleUrls: ["app/ng2-bs3-modal/components/modal.css"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ModalComponent);
exports.ModalComponent = ModalComponent;
var ModalSize = (function () {
    function ModalSize() {
    }
    ModalSize.validSize = function (size) {
        return size && (size === ModalSize.Small || size === ModalSize.Large || size === ModalSize.FullScreen);
    };
    return ModalSize;
}());
ModalSize.Small = 'sm';
ModalSize.Large = 'lg';
ModalSize.FullScreen = 'fs';
exports.ModalSize = ModalSize;
//# sourceMappingURL=modal.js.map