import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BomPosition } from './bom-position';
import { PositionAttributeValue } from './position-attribute-value';
import { PositionErrorList } from './position-error-list';
import { PositionError } from './position-error';

@Injectable()
export class PositionStoreService {
  private BASE_URL = 'api/positions';
  constructor(private _http: Http) { }
  addPosition(newPosition: BomPosition): Observable<BomPosition> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const result = new Subject<BomPosition>();
    this._http.put(this.BASE_URL, JSON.stringify(newPosition), options)
      .map((res: Response) => res.json())
      .subscribe(pos => {
        result.next(this.mapPosition(pos));
      },
      err => {
        if (err['status'] === 500) {
          result.error({ message: JSON.parse(err['_body'])['ExceptionMessage'] });
        } else {
          result.error(err);
        }
      }
      );
    return result.asObservable();
  }

  addPositionList(newPositions: BomPosition[]): Observable<PositionErrorList> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const result = new Subject<PositionErrorList>();
    return this._http.put(this.BASE_URL + '/multiple', JSON.stringify(newPositions), options)
      .map(() => this.emptyError())
      .catch((res: Response) => this.mapError(res));
  }

  editPosition(modifiedPosition: BomPosition): Observable<BomPosition> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const result = new Subject<BomPosition>();
    this._http.post(this.BASE_URL, JSON.stringify(modifiedPosition), options)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(this.mapPosition(res));
      },
      err => {
        if (err['status'] === 500) {
          result.error({ message: JSON.parse(err['_body'])['ExceptionMessage'] });
        } else {
          result.error(err);
        }
      }
      );
    return result.asObservable();
  }

  editPositionList(modifiedPositions: BomPosition[]): Observable<PositionErrorList> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const result = new Subject<BomPosition[]>();
    return this._http.post(this.BASE_URL + '/multiple', JSON.stringify(modifiedPositions), options)
      .map(() => this.emptyError())
      .catch((res: Response) => this.mapError(res));
  }

  mapError(errorResponse: any): Observable<PositionErrorList> {
    const list: PositionErrorList = new PositionErrorList();
    const parsedJson = errorResponse.json();
    list.message = parsedJson.message;
    list.errorObject = this.mapPositionErrors(parsedJson.errorObject);
    return Observable.throw(list);
  }

  emptyError(): PositionErrorList {
    const list: PositionErrorList = new PositionErrorList();
    list.message = '';
    list.errorObject = new Array<PositionError>();
    return list;
  }


  mapPositionErrors(parsedPositionErrors: any[]): PositionError[] {
    const result = new Array<PositionError>();
    let index: number;
    let currentError: PositionError;
    for (index = 0; index < parsedPositionErrors.length; index += 1) {
      currentError = new PositionError();
      currentError.index = parsedPositionErrors[index].Index;
      currentError.message = parsedPositionErrors[index].Message;
      result.push(currentError);
    }

    return result;
  }




  selectPage(nodeId: number, pageNumber: number, pageSize: number): Observable<BomPosition[]> {
    const result = new Subject<Array<BomPosition>>();
    this._http
      .get(this.BASE_URL + '/node/' + nodeId + '/page/' + pageNumber + '/' + pageSize)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(res.map((pos: any) => this.mapPosition(pos)));
      });
    return result.asObservable();
  }


  selectNode(nodeId: number): Observable<number> {
    const result = new Subject<number>();
    this._http
      .get(this.BASE_URL + '/node/' + nodeId + '/count')
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(res);
      });
    return result.asObservable();
  }


  deletePosition(deletedPosition: BomPosition): Observable<BomPosition> {
    const result = new Subject<BomPosition>();
    this._http
      .delete(this.BASE_URL + '/' + deletedPosition.id)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(this.mapPosition(res));
      }
      );
    return result.asObservable();
  }

  clearNode(nodeId: number): Observable<null> {
    const result = new Subject<null>();
    this._http
      .delete(this.BASE_URL + '/node/' + nodeId)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next();
      }
      );
    return result.asObservable();
  }

  pasteNode(sourceNodeId: number, targetNodeId: number): Observable<null> {
    const result = new Subject<null>();
    this._http
      .post(this.BASE_URL + '/node/' + sourceNodeId + '/paste-to-node/' + targetNodeId, '')
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next();
      }
      );
    return result.asObservable();
  }

  mapPosition(res: any): BomPosition {
    const resultPosition = new BomPosition();
    resultPosition.id = res.id;
    resultPosition.nodeId = res.nodeId;
    resultPosition.materialId = res.materialId;
    resultPosition.partId = res.partId;
    resultPosition.groupCode = res.groupCode;
    resultPosition.partCode = res.partCode;
    resultPosition.commodityCode = res.commodityCode;
    resultPosition.tag = res.tag;
    resultPosition.description = res.description;
    resultPosition.quantity = res.quantity;
    resultPosition.isTwm = res.isTwm;
    resultPosition.description2 = res.description2;
    resultPosition.unit = res.unit;
    resultPosition.attributes = this.mapAttributes(res.attributes);
    resultPosition.indexedAttributes = this.indexAttributes(resultPosition.attributes);
    return resultPosition;
  }

  mapPositions(res: any): BomPosition[] {
    const resultArray = new Array<BomPosition>();
    let i: number;
    for (i = 0; i < res.length; i += 1) {
      resultArray.push(this.mapPosition(res[i]));
    }
    return resultArray;

  }

  mapAttributes(attrs: any): PositionAttributeValue[] {
    let result = new Array<PositionAttributeValue>();
    if (attrs) {
      result = attrs.map((attr: any) => this.mapSingleAttribute(attr));
    }
    return result;
  }

  mapSingleAttribute(attr: any) {
    return new PositionAttributeValue(attr.attribute, attr.value);
  }

  indexAttributes(rawAttributes: PositionAttributeValue[]): PositionAttributeValue[] {
    const result = new Array<PositionAttributeValue>();
    for (const position of rawAttributes) {
      result[position.attribute.id] = position;
    }
    return result;
  }

  getTag(tag: string, projectDisciplineId: number): Observable<BomPosition[]> {
    const result = new Subject<Array<BomPosition>>();
    this._http
      .get(this.BASE_URL + '/projectDiscipline/' + projectDisciplineId.toString() + '/tag/?tag=' + encodeURIComponent(tag))
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(res.map((pos: any) => this.mapPosition(pos)));
      });
    return result.asObservable();
  }

}
