import { Injectable } from '@angular/core';
import { Material } from './material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TableAndSizeFilter } from './table-and-size-filter';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MaterialStoreService {
  private BASE_URL = '/Oratrios.Api/api/materials';
  constructor(private _http: Http) { }

  private _store: Material[][] = new Array<Material[]>();

  getSingle(materialId: number, partId: number) {
    const _resultArray = new Array<Material[]>();
    const result = new Subject<Array<Material>>();
    this._http
      .get(this.BASE_URL + '/' + materialId.toString() + '/' + partId)
      .map((res: Response) => res.json())
      .subscribe(res => {
        const resultArray = new Array<Material>();
        for (let index = 0; index < res.length; index += 1) {
          resultArray.push(new Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId,
            res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
        }
        result.next(resultArray);
      });
    return result.asObservable();

  }

  getAll(partId: number, filter: TableAndSizeFilter, pageNumber: number, pageSize: number): Observable<Array<Material>> {
    const _resultArray = new Array<Material[]>();
    const result = new Subject<Array<Material>>();
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this._http
      .post(this.BASE_URL + '/' + partId + '/page/' + pageNumber + '/' + pageSize, filter.tableFilters, options)
      .map((res: Response) => res.json())
      .subscribe(res => {
        const resultArray = new Array<Material>();
        for (let index = 0; index < res.length; index += 1) {
          resultArray.push(new Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId,
            res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
        }
        result.next(resultArray);
      });
    return result.asObservable();
  }

  getAllCount(partId: number, filter: TableAndSizeFilter): Observable<number> {
    const result = new Subject<number>();
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this._http
      .post(this.BASE_URL + '/' + partId + '/count', filter.tableFilters, options)
      .map((res: Response) => res.json())
      .subscribe(res =>
        result.next(res)
      );
    return result.asObservable();
  }

  getByCommodityCode(disciplineId: number, commodityCode: string): Observable<Array<Material>> {
    const _resultArray = new Array<Material[]>();
    const result = new Subject<Array<Material>>();
    this._http
      .get(this.BASE_URL + '/commodityCode/' + disciplineId.toString() + '/' + commodityCode)
      .map((res: Response) => res.json())
      .subscribe(res => {
        const resultArray = new Array<Material>();
        for (let index = 0; index < res.length; index += 1) {
          resultArray.push(new Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId,
            res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
        }
        result.next(resultArray);
      });
    return result.asObservable();

  }

  getByCommodityCodeAndPart(disciplineId: number, partId: number, commodityCode: string): Observable<Array<Material>> {
    const _resultArray = new Array<Material[]>();
    const result = new Subject<Array<Material>>();
    this._http
      .get(this.BASE_URL + '/' + partId.toString() + '/commodityCode/' + disciplineId.toString() + '/' + commodityCode)
      .map((res: Response) => res.json())
      .subscribe(res => {
        const resultArray = new Array<Material>();
        for (let index = 0; index < res.length; index += 1) {
          resultArray.push(new Material(res[index].id, res[index].groupCode, res[index].partCode, res[index].partId,
            res[index].commodityCode, res[index].description, res[index].description2, res[index].unit));
        }
        result.next(resultArray);
      });
    return result.asObservable();

  }
}
