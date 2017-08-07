import { Injectable } from '@angular/core';
import { CommodityTable } from './commodity-table';
import { CommodityTableValue } from './commodity-table-value';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

@Injectable()
export class CommodityTableStoreService
{
  private _store: CommodityTable[][] = new Array<CommodityTable[]>();
  private BASE_URL = 'api/commoditytables';
  constructor(private _http: Http){}

  getAll(disciplineCode: string, groupCode: string, partCode: string): Observable<Array<CommodityTable>>
  {

    var _resultArray = new Array<CommodityTable[]>();
    var result = new Subject<Array<CommodityTable>>();
    this._http
        .get(this.BASE_URL + "/" + disciplineCode + "/" + groupCode+ "/" + partCode)
        .map((res:Response) => res.json())
        .subscribe(res => {
          var resultArray = new Array<CommodityTable>();
          for(var index = 0; index < res.length; index += 1)
          {
            resultArray.push(new CommodityTable(res[index].name, res[index].description,
              res[index].values.map((v: any) => new CommodityTableValue(v.code, v.description))));
          }
          result.next(resultArray);
        });
    return result.asObservable();

  }
}
