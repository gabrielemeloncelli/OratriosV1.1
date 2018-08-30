import { Injectable } from '@angular/core';
import { Http,
            Headers,
            RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExportService {
    private BASE_URL = '/Oratrios.Api/api/export';
    constructor(private _http: Http) {}


    exportAll(projectDisciplineId: number): Observable<string> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const result = new Subject<string>();
        this._http
            .get(this.BASE_URL + '/all/' + projectDisciplineId, options)
            .subscribe(res => {
                JSON.parse(res.text());
                result.next(JSON.parse(res.text()).linkAddress);
            });
        return result.asObservable();
    }
}
