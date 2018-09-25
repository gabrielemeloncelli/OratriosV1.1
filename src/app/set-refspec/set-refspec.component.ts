import { 
    Component,
    OnInit}
    from '@angular/core';

import { RefSpec } from '../core/ref-spec';
import { RefSpecDto } from '../core/ref-spec-dto';

enum RefSpecFilterType {
  None = 1, 
  Commodity,
  Tag
}

@Component({
    templateUrl: 'set-refspec.component.html',
    styleUrls: ['set-refspec.component.css'],
    selector: 'set-refspec'
  })  
  export class SetRefspecComponent implements OnInit {
    public commodityTemplate: string;
    public tagTemplate: string;
    public refspecs: RefSpec[];
    public isBusy: boolean;
    public totItems: number;
    public currentFilter: RefSpecFilterType;
    private _generatedDtos: RefSpecDto[];

    ngOnInit() {
      this.refspecs = [];
      this.currentFilter = RefSpecFilterType.None;
      this._generatedDtos = this.generateDtos();
    }
    public setDirty(idx: number): void {
      this.refspecs[idx].dirty = true;
    }

    public saveDirty(idx: number): void {
      this.refspecs[idx].dirty = false;
    }
    public findCommodity(skip = 0, take = 10): void {
      this.setBusy();
      this.currentFilter = RefSpecFilterType.Commodity;
      setTimeout(() => {
        this.completeCommodity(skip, take);        
      }, 500);
    }

    public findTag(skip = 0, take = 10): void {
      this.setBusy();
      this.currentFilter = RefSpecFilterType.Tag;
      setTimeout(() => {
        this.completeTag(skip, take);        
      }, 500);

    }

    public findAll(skip = 0, take = 10): void {
      this.setBusy();
      this.currentFilter = RefSpecFilterType.None;
      setTimeout(() => {
        this.completeAll(skip, take);        
      }, 500);
    }

    private pageChanged(pageNumber: number): void {
      switch(this.currentFilter){
        case RefSpecFilterType.None: {
          this.findAll((pageNumber - 1) * 10, 10);
          break;
        }
        case RefSpecFilterType.Commodity: {
          this.findCommodity((pageNumber - 1) * 10, 10);
          break;
        }
        case RefSpecFilterType.Tag: {
          this.findTag((pageNumber - 1) * 10, 10);
          break;
        }
      }

    }

    
    private generateDtos(): RefSpecDto[] {
      var dtos: RefSpecDto[] = [];
      var dto = new RefSpecDto();
      dto.materialId = 120;
      dto.commodityCode = "COMMODITY01";
      dto.refSpec = "RefSpec001";
      dtos.push(dto);
      dto = new RefSpecDto();
      dto.materialId = 130;
      dto.commodityCode = "COMMODITY02";
      dto.tag = "TAG00001";
      dto.refSpec = "RefSpec002";
      dtos.push(dto);
      var i: number;
      for(i = 0; i < 23; i++) {
        dto = new RefSpecDto();
        dto.materialId = 100 + i * 12;
        dto.commodityCode = "COMMODITY".concat((i + 10).toString());
        dto.refSpec = "RefSpec0".concat((i + 13).toString());
        dtos.push(dto);
      }
      for(i = 0; i < 12; i++) {
        dto = new RefSpecDto();
        dto.materialId = 0;
        dto.tag = "TAG000".concat((i + 27).toString());
        dto.refSpec = "RefSpec0".concat((i + 44).toString());
        dtos.push(dto);  
      }      
      return dtos;
    }

    private setBusy(): void {
      setTimeout(() => {this.isBusy = true}, 100);
    }

    private resetBusy(): void {
      setTimeout(() => {this.isBusy = false}, 100);
    }

    private completeCommodity(skip: number, take: number): void {
      var counter = 0;
      this.refspecs = [];
      for(let dto of this._generatedDtos)
      {
        if(dto.materialId > 0 && dto.commodityCode.indexOf(this.commodityTemplate) >= 0) {
          if (counter >= skip && counter < skip + take) {
            this.refspecs.push(new RefSpec(dto));
          }
          counter++;
        }
      }
      this.totItems = counter;
      console.log("totItems: " + this.totItems);
      this.resetBusy();
    }

    private completeTag(skip: number, take: number): void {
      this.refspecs = [];
      var counter = 0;
      for(let dto of this._generatedDtos)
      {        
        if(dto.materialId == 0 && dto.tag.indexOf(this.tagTemplate) >= 0) {
          if (counter >= skip && counter < skip + take) {
            this.refspecs.push(new RefSpec(dto));
          }
          counter++;
        }
      }
      this.totItems = counter;
      console.log("totItems: " + this.totItems);
      this.resetBusy();
    }

    private completeAll(skip: number, take: number): void {      
      this.refspecs = [];
      var counter = 0;
      for(let dto of this._generatedDtos)
      {
        if (counter >= skip && counter < skip + take) {
          this.refspecs.push(new RefSpec(dto));
        }
        counter++;
      }
      this.totItems = counter;
      console.log("totItems: " + this.totItems);
      this.resetBusy();

    }





    
  }