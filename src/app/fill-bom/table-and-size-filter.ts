import { TableFilter } from './table-filter';

export class TableAndSizeFilter {
  constructor(public tableFilters: TableFilter[]) {

  }
  get cacheKey(): string {
    let resultKey = '';
    if (this.tableFilters) {
      for (let filterIndex = 0; filterIndex < this.tableFilters.length; filterIndex += 1) {
        if (resultKey) {
          resultKey += '-----';
        }
        resultKey += this.tableFilters[filterIndex].tableName + '-----' + this.tableFilters[filterIndex].detail;
      }
    }
    return resultKey;
  }
}
