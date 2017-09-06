import { CommodityTable } from './commodity-table';
import { Option } from 'ng-select/dist/option';
import { IOption } from 'ng-select/dist/option.interface';

export class MappedTable {
  public name: string;
  public description: string;
  public detailItems: Option[];
  constructor(table: CommodityTable) {
    this.name = table.name;
    this.description = table.description;
    this.detailItems = table.values.map(d => new Option({value: d.code, label: d.description}));
  }
}
