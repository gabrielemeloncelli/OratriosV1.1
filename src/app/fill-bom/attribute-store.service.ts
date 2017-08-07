import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { Subject }                                  from 'rxjs/Subject';

import { Attribute }  from './attribute';

@Injectable()
export class AttributeStoreService
{
  private BASE_URL = 'api/attributes';
  constructor(private _http: Http){}

  private _store: Attribute[][] = new Array<Attribute[]>();


  getAll(projDisciplineId: number): Observable<Array<Attribute>>
  {
    var _resultArray = new Array<Attribute[]>();
    var result = new Subject<Array<Attribute>>();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http
        .get(this.BASE_URL + "/" + projDisciplineId, options)
        .map((res:Response) => res.json())
        .subscribe(res => { result.next(res.map((a: any) => new Attribute(a.id, a.code, a.description, a.mandatory, a.maxlength, a.spmatId, a.forcedMandatory, a.disabled)))});

    return result.asObservable();
  }
}
