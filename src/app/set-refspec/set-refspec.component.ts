import { 
    Component,
    OnInit}
    from '@angular/core';

import { RefSpec } from '../core/ref-spec';
import { RefSpecDto } from '../core/ref-spec-dto';

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
    ngOnInit() {
      this.refspecs = [];
    }
    public setDirty(idx: number): void {
      this.refspecs[idx].dirty = true;
    }

    public saveDirty(idx: number): void {
      this.refspecs[idx].dirty = false;
    }
    public findCommodity(): void {
      this.setBusy();
      setTimeout(() => {
        this.completeCommodity();        
      }, 500);
    }

    public findTag(): void {
      this.setBusy();
      setTimeout(() => {
        this.completeTag();        
      }, 500);

    }

    public findAll(): void {
      this.setBusy();
      setTimeout(() => {
        this.completeAll();        
      }, 500);
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
      dto = new RefSpecDto();
      dto.materialId = 0;
      dto.tag = "TAG00002";
      dto.refSpec = "RefSpec003";
      dtos.push(dto);
      return dtos;
    }

    private setBusy(): void {
      this.isBusy = true;
    }

    private resetBusy(): void {
      this.isBusy = false;
    }

    private completeCommodity(): void {
      this.refspecs = [];
      for(let dto of this.generateDtos())
      {
        if(dto.materialId > 0 && dto.commodityCode.indexOf(this.commodityTemplate) >= 0) {
          this.refspecs.push(new RefSpec(dto));
        }
      }
      this.resetBusy();
    }

    private completeTag(): void {
      this.refspecs = [];
      for(let dto of this.generateDtos())
      {
        if(dto.materialId == 0 && dto.tag.indexOf(this.tagTemplate) >= 0) {
          this.refspecs.push(new RefSpec(dto));
        }
      }
      this.resetBusy();
    }

    private completeAll(): void {      
      this.refspecs = [];
      for(let dto of this.generateDtos())
      {
        this.refspecs.push(new RefSpec(dto));
      }
      this.resetBusy();

    }



    
  }