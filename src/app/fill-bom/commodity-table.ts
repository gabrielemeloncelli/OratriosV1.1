import { CommodityTableValue } from './commodity-table-value';

export class CommodityTable {
  constructor(public name: string, public description: string, public values: CommodityTableValue[]) {}
}
