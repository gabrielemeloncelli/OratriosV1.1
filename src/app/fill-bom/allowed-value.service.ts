import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { Subject }                                  from 'rxjs/Subject';

import { AllowedValue } from './allowed-value';

@Injectable()
export class AllowedValueService
{
  private BASE_URL = 'api/allowedattributevalues';
  constructor(private _http: Http){}


  getAll(attributeId: number): Observable<Array<AllowedValue>>
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http
        .get(this.BASE_URL + "/" + attributeId, options)
        .map((res:Response) => res.json());
  }
}
