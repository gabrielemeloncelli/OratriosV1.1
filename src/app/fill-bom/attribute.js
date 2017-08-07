"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attribute = (function () {
    function Attribute(id, code, description, mandatory, maxlength, spmatId, forcedMandatory, disabled) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.mandatory = mandatory;
        this.maxlength = maxlength;
        this.spmatId = spmatId;
        this.forcedMandatory = forcedMandatory;
        this.disabled = disabled;
    }
    return Attribute;
}());
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.js.map