"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableAndSizeFilter = (function () {
    function TableAndSizeFilter(tableFilters) {
        this.tableFilters = tableFilters;
    }
    Object.defineProperty(TableAndSizeFilter.prototype, "cacheKey", {
        get: function () {
            var resultKey = "";
            if (this.tableFilters) {
                for (var filterIndex = 0; filterIndex < this.tableFilters.length; filterIndex += 1) {
                    if (resultKey) {
                        resultKey += '-----';
                    }
                    resultKey += this.tableFilters[filterIndex].tableName + '-----' + this.tableFilters[filterIndex].detail;
                }
            }
            return resultKey;
        },
        enumerable: true,
        configurable: true
    });
    return TableAndSizeFilter;
}());
exports.TableAndSizeFilter = TableAndSizeFilter;
//# sourceMappingURL=table-and-size-filter.js.map