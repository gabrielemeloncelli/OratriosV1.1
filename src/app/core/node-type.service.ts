import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import { NodeType } from './node-type';

@Injectable()
export class NodeTypeService {
    private BASE_URL = 'api/projectdiscipline/nodeTypes';

    constructor(private http: Http) { }

    public getNodeTypes(projectId: number): Observable<Array<NodeType>>
    {
        var result: Subject<Array<NodeType>> = new Subject<Array<NodeType>>();
        this.http.get(this.BASE_URL + "/" + projectId.toString())
        .map((res: Response) => res.json())
        .subscribe(nt => result.next(this.getNodeTypesFromResponse(nt)));


        return result.asObservable();
    }

    private getNodeTypesFromResponse(jsonNodeTypes: Array<any>): Array<NodeType>
    {
        return jsonNodeTypes.map(nt => new NodeType(nt.code, nt.shortDescription, nt.description));

    }

}