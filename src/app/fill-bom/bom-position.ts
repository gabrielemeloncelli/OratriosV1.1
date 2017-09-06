import { PositionAttributeValue } from './position-attribute-value';

export class BomPosition {
  public id: number;
  public nodeId: number;
  public materialId: number;
  public groupCode: string;
  public partCode: string;
  public partId: number;
  public commodityCode: string;
  public tag: string;
  public description: string;
  public quantity: number;
  public isTwm: boolean;
  public description2: string;
  public unit: string;
  public attributes: PositionAttributeValue[];
  public indexedAttributes: PositionAttributeValue[];
  public isDirty: boolean;
  public calculateCommodityCode(): string {
    if (!!this.commodityCode) {
      return this.commodityCode;
    }
    return this.tag;
  }

}
