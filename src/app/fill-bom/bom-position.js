"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BomPosition = (function () {
    function BomPosition() {
    }
    BomPosition.prototype.calculateCommodityCode = function () {
        if (!!this.commodityCode) {
            return this.commodityCode;
        }
        return this.tag;
    };
    return BomPosition;
}());
exports.BomPosition = BomPosition;
//# sourceMappingURL=bom-position.js.map