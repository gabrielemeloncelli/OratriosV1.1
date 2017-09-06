import { Injectable } from '@angular/core';
import { CommodityPart } from './commodity-part';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Injectable()
export class CommodityPartStoreService {
  private _store: CommodityPart[][] = new Array<CommodityPart[]>();
  private BASE_URL = 'api/commodityparts';

  constructor(private _http: Http) {}

  getAll(groupId: number): Observable<Array<CommodityPart>> {
    const _resultArray = new Array<CommodityPart[]>();
    const result = new Subject<Array<CommodityPart>>();
    this._http
        .get(this.BASE_URL + '/' + groupId)
        .map((res: Response) => res.json())
        .subscribe(res => {
          const resultArray = new Array<CommodityPart>();
          for (let index = 0; index < res.length; index += 1) {
            resultArray.push(new CommodityPart(res[index].id, res[index].code, res[index].description, res[index].groupCode));
          }
          result.next(resultArray);
        });
    return result.asObservable();

  }
}
