import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RefSpecDto } from '../core/ref-spec-dto';



@Injectable()
export class RefSpecService {
    private _refSpecs: BehaviorSubject<Array<RefSpecDto>> = new BehaviorSubject(new Array<RefSpecDto>());
    public refSpecs: Observable<Array<RefSpecDto>> = this._refSpecs.asObservable();
    private _count: BehaviorSubject<number> = new BehaviorSubject(0);
    public count: Observable<number> = this._count.asObservable();
    private BASE_URL = '/Oratrios.Api/api/RefSpec';
    constructor(private _http: Http) { }


    getAll(projDisciplineId: number, commodity: string, tag: string, skip: number, take: number): void {
        const result = new Subject<Array<RefSpecDto>>();
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        var queryString = this.getBaseQueryString(commodity, tag);
        if (queryString != '') {
            queryString += '&';
        }
        queryString += 'skip=' + skip.toString() + '&take=' + take.toString();
        const pathExtension = this.getPathExtension(commodity, tag);
        this._http
            .get(this.BASE_URL + pathExtension + '/' + projDisciplineId + '?' + queryString, options)
            .map((res: Response) => res.json())
            .subscribe(res => {
                this._refSpecs.next(res.map((a: any) => new RefSpecDto(a.materialId,
                    a.commodityCode, a.tag, a.refSpec)));
            });


    }

    getCount(projDisciplineId: number, commodity: string, tag: string): void {
        const result = new Subject<Array<RefSpecDto>>();
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        var queryString = this.getBaseQueryString(commodity, tag);
        const pathExtension = this.getPathExtension(commodity, tag);
        this._http
            .get(this.BASE_URL + pathExtension + '/count/' + projDisciplineId + '?' + queryString, options)
            .map((res: Response) => res.json())
            .subscribe(res => {
                this._count.next(res);
            });


    }


    private getBaseQueryString(commodity: string, tag: string): string {
        var transfCommodity = commodity;
        var queryString = '';
        if (transfCommodity == null || transfCommodity == '') {
            transfCommodity = null;
            if (tag != null && tag != '') {
                const transfTag = encodeURIComponent(tag);
                queryString = 'tag=' + transfTag;
            }
        } else {
            transfCommodity = encodeURIComponent(transfCommodity);
            queryString = 'commodity' + transfCommodity;
        }
        return queryString;
    }

    private getPathExtension(commodity: string, tag: string): string {
        var transfCommodity = commodity;
        var pathExtension = '';
        if (commodity == null || commodity == '') {
            if (tag != null && tag != '') {
                pathExtension = '/tag';
            }
        } else {
            pathExtension = '/commodity';
        }
        return pathExtension;
    }

}
