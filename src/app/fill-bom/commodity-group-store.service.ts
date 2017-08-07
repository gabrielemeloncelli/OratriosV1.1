import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { CommodityGroup } from './commodity-group';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommodityGroupStoreService
{
  private BASE_URL : string = 'api/commoditygroups';

  constructor(private _http:Http){}

  getAll(disciplineId: number): Observable<Array<CommodityGroup>>
  {
    var result = new Subject<Array<CommodityGroup>>();
    this._http
        .get(this.BASE_URL + "/" + disciplineId)
        .map((res:Response) => res.json())
        .subscribe(res => {
          var resultArray = new Array<CommodityGroup>();
          for(var index = 0; index < res.length; index += 1)
          {
            resultArray.push(new CommodityGroup(res[index].id, res[index].code, res[index].description));
          }
          result.next(resultArray);
        });
        return result.asObservable();

  }
}
