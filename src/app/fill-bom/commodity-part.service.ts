import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';

import { CommodityPart }              from './commodity-part';
import { CommodityPartStoreService }  from './commodity-part-store.service';


@Injectable()
export class CommodityPartService{
  private _parts: BehaviorSubject<Array<CommodityPart>> = new BehaviorSubject(new Array<CommodityPart>());
  public parts: Observable<Array<CommodityPart>> = this._parts.asObservable();
  private nodeId: number = 0;

constructor(private _storeService: CommodityPartStoreService){}


  getAll(groupId: number)
  {
    this._storeService.getAll(groupId).subscribe( parts => this._parts.next(parts));
  }


}
