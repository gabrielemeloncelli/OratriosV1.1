import { CommodityGroup } from '../fill-bom/commodity-group';
import { CommodityPart } from '../fill-bom/commodity-part';

export class NodeDTO {
  id: number;
  name: string;
  nodeType: string;
  hasChildren: boolean;
  idFather: number;
  url: string;
  locked: boolean;
  lockedBy: string;
  projectDisciplineId: number;
  forceDifferentType: boolean;
  commodityGroup: CommodityGroup;
  commodityPart: CommodityPart;
}
