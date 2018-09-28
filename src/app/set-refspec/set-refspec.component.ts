import { 
    Component,
    OnInit,
    AfterViewInit}
    from '@angular/core';

import { RefSpec } from '../core/ref-spec';
import { RefSpecDto } from '../core/ref-spec-dto';
import { RefSpecService } from './ref-spec.service';

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

    constructor(private _refSpecService: RefSpecService) {}

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

    ngAfterViewInit() {
      this._refSpecService.refSpecs.subscribe(specs =>
        {
          console.log('SetRefspecComponent -- ngAfterInit -- subscribe')
          var spec: RefSpecDto;
          this.refspecs = [];
          for(spec of specs){
            this.refspecs.push(new RefSpec(spec));
          }
          this.resetBusy();
        });
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
      this._refSpecService.getAll(1, null, null, skip, take);
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
      var dto = new RefSpecDto(120, "COMMODITY01", null, "RefSpec001");
      dtos.push(dto);
      dto = new RefSpecDto(130, "COMMODITY02", "TAG00001", "RefSpec002");
      dto.refSpec = "RefSpec002";
      dtos.push(dto);
      var i: number;
      for(i = 0; i < 23; i++) {
        dto = new RefSpecDto(100 + i * 12, "COMMODITY".concat((i + 10).toString()), null, "RefSpec0".concat((i + 13).toString()));
        dtos.push(dto);
      }
      for(i = 0; i < 12; i++) {
        dto = new RefSpecDto(0, null, "TAG000".concat((i + 27).toString()), "RefSpec0".concat((i + 44).toString()));
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