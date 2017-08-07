import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { CommodityTableValue }              from './commodity-table-value';
import { CommodityTableValueStoreService }  from './commodity-table-value-store.service';


@Injectable()
export class CommodityTableValueService{
  private _values: BehaviorSubject<Array<CommodityTableValue>> = new BehaviorSubject(new Array<CommodityTableValue>());
  public values: Observable<Array<CommodityTableValue>> = this._values.asObservable();


constructor(private _storeService: CommodityTableValueStoreService){}


  getAll(disciplineCode:string, groupCode: string, partCode: string, tableName: string)
  {
    this._storeService.getAll(disciplineCode, groupCode, partCode, tableName).subscribe( values => this._values.next(values));
  }


}
