import { CommodityGroup } from '../fill-bom/commodity-group';
import { CommodityPart } from '../fill-bom/commodity-part';

export class TreeNode {
  expanded = false;
  cssClass: string = null;




  constructor(public id: number,
   public url: string,
   public name: string,
   public type: string,
   public idFather: number,
   public locked: boolean,
   public lockedBy: string,
   public hasPositions: boolean,
   public lockedWbs: string,
   public commodityGroup: CommodityGroup,
   public commodityPart: CommodityPart) {
      this.cssClass = this.getCssClass();
  }



  toggleExpansion() {
    this.expanded = !this.expanded && !!this.url;
    this.cssClass = this.getCssClass();
  }

  refreshCss() {
    this.cssClass = this.getCssClass();
  }

  canDelete(): boolean {
    if (!!this.url) {
      return false;
    }
    return !this.hasPositions;
  }


  private getCssClass(): string {
    if (this.url) {
      if (this.expanded) {
        return 'glyphicon glyphicon-chevron-down';
      }
      return 'glyphicon glyphicon-chevron-right';

    }
    return 'glyphicon glyphicon-minus';
  }
}
