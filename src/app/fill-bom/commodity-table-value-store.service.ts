import { Injectable } from '@angular/core';
import { CommodityTableValue } from './commodity-table-value';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Injectable()
export class CommodityTableValueStoreService {
  private _store: CommodityTableValue[][] = new Array<CommodityTableValue[]>();
  private BASE_URL = 'api/commoditytablevalues';
  constructor(private _http: Http) { }

  getAll(disciplineCode: string, groupCode: string, partCode: string, tableName: string): Observable<Array<CommodityTableValue>> {

    const _resultArray = new Array<CommodityTableValue[]>();
    let resultArray: Array<CommodityTableValue>;
    const result = new Subject<Array<CommodityTableValue>>();
    this._http
      .get(this.BASE_URL + '/' + disciplineCode + '/' + groupCode + '/' + partCode + '/' + tableName)
      .map((res: Response) => res.json())
      .subscribe(res => {
        resultArray = res.map((v: any) => new CommodityTableValue(v.code, v.description));
        result.next(resultArray);
      });
    return result.asObservable();

  }
}
