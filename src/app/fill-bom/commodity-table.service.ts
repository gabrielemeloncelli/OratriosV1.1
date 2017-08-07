import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { CommodityTable }             from './commodity-table';
import { CommodityTableStoreService } from './commodity-table-store.service';


@Injectable()
export class CommodityTableService{
  private _tables: BehaviorSubject<Array<CommodityTable>> = new BehaviorSubject(new Array<CommodityTable>());
  public tables: Observable<Array<CommodityTable>> = this._tables.asObservable();


constructor(private _storeService: CommodityTableStoreService){}


  getAll(disciplineCode:string, groupCode: string, partCode: string)
  {
    this._storeService.getAll(disciplineCode, groupCode, partCode).subscribe( tables => this._tables.next(tables));
  }


}
