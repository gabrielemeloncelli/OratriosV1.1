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
    var headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var result = new Subject<BomPosition>();
    console.log('PositionStoreService -- addPosition -- JSON.stringify(newPosition): ' + JSON.stringify(newPosition));//TODO remove
    this._http.put(this.BASE_URL, JSON.stringify(newPosition), options)
      .map((res: Response) => res.json())
      .subscribe(pos => {
        result.next(this.mapPosition(pos));
      },
      err => {
        if (err["status"] === 500) {
          result.error({ message: JSON.parse(err["_body"])["ExceptionMessage"] });
        }
        else {
          result.error(err);
        }
      }
      );
    return result.asObservable();
  }

  addPositionList(newPositions: BomPosition[]): Observable<PositionErrorList> {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var result = new Subject<PositionErrorList>();
    return this._http.put(this.BASE_URL + "/multiple", JSON.stringify(newPositions), options)    
      .map(() => this.emptyError()) 
      .catch((res: Response) => this.mapError(res))
      

  }

  editPosition(modifiedPosition: BomPosition): Observable<BomPosition> {
    var headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var result = new Subject<BomPosition>();
    this._http.post(this.BASE_URL, JSON.stringify(modifiedPosition), options)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(this.mapPosition(res));
      },
      err => {
        if (err["status"] === 500) {
          result.error({ message: JSON.parse(err["_body"])["ExceptionMessage"] });
        }
        else {
          result.error(err);
        }
      }
      );
    return result.asObservable();
  }

  mapError(errorResponse: any): Observable<PositionErrorList> {
    var list: PositionErrorList = new PositionErrorList();
    console.log("position-store.service -- mapError -- errorResponse: " + errorResponse); //TODO: remove
    console.log("position-store.service -- mapError -- errorResponse.json(): " + errorResponse.json()); //TODO: remove
    var parsedJson = errorResponse.json();
    list.message = parsedJson.message;
    console.log("position-store.service -- mapError -- parsedJson: " + parsedJson); //TODO: remove
    console.log("position-store.service -- mapError -- parsedJson.message: " + parsedJson.message); //TODO: remove
    list.errorObject = this.mapPositionErrors(parsedJson.errorObject);
    console.log("position-store.service -- mapError -- parsedJson.errorObject: " + parsedJson.errorObject); //TODO: remove
    return Observable.throw(list);
  }

  emptyError(): PositionErrorList {
    let list: PositionErrorList = new PositionErrorList();
    list.message = "";
    list.errorObject = new Array<PositionError>();
    return list;
  }


  mapPositionErrors(parsedPositionErrors: any[]): PositionError[] {
    var result = new Array<PositionError>();
    var index: number;
    var currentError: PositionError;
    for (index = 0; index < parsedPositionErrors.length; index += 1) {
      currentError = new PositionError();
      console.log("position-store.service -- mapPositionErrors -- parsedPositionErrors[index].Index: " + parsedPositionErrors[index].Index);//TODO: remove
      currentError.index = parsedPositionErrors[index].Index;
      currentError.message = parsedPositionErrors[index].Message;
      result.push(currentError);
    }

    return result;
  }

  
  
  
  selectPage(nodeId: number, pageNumber: number, pageSize: number): Observable<BomPosition[]> {

    var _resultArray = new Array<BomPosition[]>();
    var result = new Subject<Array<BomPosition>>();
    this._http
      .get(this.BASE_URL + "/node/" + nodeId + "/page/" + pageNumber + "/" + pageSize)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(res.map((pos: any) => this.mapPosition(pos)));
      });
    return result.asObservable();
  }


  selectNode(nodeId: number): Observable<number> {

    var _resultArray = new Array<BomPosition[]>();
    var result = new Subject<number>();
    this._http
      .get(this.BASE_URL + "/node/" + nodeId + '/count')
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(res);
      });
    return result.asObservable();
  }


  deletePosition(deletedPosition: BomPosition): Observable<BomPosition> {
    var result = new Subject<BomPosition>();
    this._http
      .delete(this.BASE_URL + "/" + deletedPosition.id)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(this.mapPosition(res));
      }
      );
    return result.asObservable();
  }

  clearNode(nodeId: number): Observable<null> {
    var result = new Subject<null>();
    this._http
      .delete(this.BASE_URL + "/node/" + nodeId)
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next();
      }
      );
    return result.asObservable();
  }

  pasteNode(sourceNodeId: number, targetNodeId: number): Observable<null> {
    var result = new Subject<null>();
    this._http
      .post(this.BASE_URL + "/node/" + sourceNodeId + "/paste-to-node/" +targetNodeId, "")
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next();
      }
      );
    return result.asObservable();
  }

  mapPosition(res: any): BomPosition {
    var resultPosition = new BomPosition();
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

    return resultPosition;
  }

  mapPositions(res: any): BomPosition[] {
    var resultArray = new Array<BomPosition>();
    var i: number;
    for (i = 0; i < res.length; i += 1) {
      resultArray.push(this.mapPosition(res[i]));
    }
    return resultArray;

  }

  mapAttributes(attrs: any): PositionAttributeValue[] {
    var result = new Array<PositionAttributeValue>();
    if (attrs) {
      result = attrs.map((attr: any) => this.mapSingleAttribute(attr));
    }
    return result;
  }

  mapSingleAttribute(attr: any) {
    return new PositionAttributeValue(attr.attribute, attr.value);
  }

  getTag(tag: string, projectDisciplineId: number): Observable<BomPosition[]> {
    var _resultArray = new Array<BomPosition[]>();
    var result = new Subject<Array<BomPosition>>();
    this._http
      .get(this.BASE_URL + "/projectDiscipline/" + projectDisciplineId.toString() + "/tag/?tag=" + encodeURIComponent(tag))
      .map((res: Response) => res.json())
      .subscribe(res => {
        result.next(res.map((pos: any) => this.mapPosition(pos)));
      });
    return result.asObservable();
  }

}
