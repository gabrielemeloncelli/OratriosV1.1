"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var option_1 = require("angular2-select/dist/option");
var MappedTable = (function () {
    function MappedTable(table) {
        this.name = table.name;
        this.description = table.description;
        this.detailItems = table.values.map(function (d) { return new option_1.Option(d.code, d.description); });
    }
    return MappedTable;
}());
exports.MappedTable = MappedTable;
//# sourceMappingURL=mapped-table.js.map