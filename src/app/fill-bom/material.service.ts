import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Material } from './material';
import { TableAndSizeFilter } from './table-and-size-filter';
import { MaterialStoreService } from './material-store.service';

@Injectable()
export class MaterialService{
  private _materials: BehaviorSubject<Array<Material>> = new BehaviorSubject(new Array<Material>());
  public materials: Observable<Array<Material>> = this._materials.asObservable();
  private _totalItems = new BehaviorSubject<number>(0);
  public totalItems = this._totalItems.asObservable();


constructor(private _storeService: MaterialStoreService){}

  getSingle(materialId: number, partId: number)
  {
    this._storeService.getSingle(materialId, partId).subscribe( materials => this._materials.next(materials));
  }
  getAll(partId: number, filter: TableAndSizeFilter, pageNumber: number, pageSize: number)
  {
    this._storeService.getAll(partId, filter, pageNumber, pageSize).subscribe( materials => this._materials.next(materials));
  }

  getAllCount(partId: number, filter: TableAndSizeFilter)
  {
    this._storeService.getAllCount(partId, filter).subscribe(totalItems => this._totalItems.next(totalItems));
  }

  getByCommodityCode(disciplineId: number, commodityCode: string)
  {
    this._storeService.getByCommodityCode(disciplineId, commodityCode).subscribe( materials => this._materials.next(materials));
  }

  getByCommodityCodeAndPart(disciplineId: number, partId: number, commodityCode: string)
  {
    this._storeService.getByCommodityCodeAndPart(disciplineId, partId, commodityCode).subscribe( materials => this._materials.next(materials));
  }

  clear()
  {
    this._materials.next(new Array<Material>());
  }




}
