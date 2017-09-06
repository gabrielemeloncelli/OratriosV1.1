import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CommodityGroup } from './commodity-group';
import { CommodityGroupStoreService } from './commodity-group-store.service';


@Injectable()
export class CommodityGroupService {
  private _groups: BehaviorSubject<Array<CommodityGroup>> = new BehaviorSubject(new Array<CommodityGroup>());
  public groups: Observable<Array<CommodityGroup>> = this._groups.asObservable();
  private nodeId = 0;

  constructor(private _storeService: CommodityGroupStoreService) { }

  getAll(disciplineId: number) {
    this._storeService.getAll(disciplineId).subscribe(groups => this._groups.next(groups));
  }
}
