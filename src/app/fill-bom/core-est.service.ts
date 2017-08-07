import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http , Response } from '@angular/http';
import { CoreEstServiceConfig } from './core-est-service-config';
//import { Rx } from 'rxjs/core';


@Injectable()
export class CoreEstService{

  constructor(@Optional() config: CoreEstServiceConfig)
  {
    console.log("CoreEstService - building instance");//TODO: remove
  }


  public welcome:string = "core.est.service.welcome";
  private _nodeTypes : any[] = [{"text": "Area", "id": "Area"}, {"text": "Zone", "id": "Zone"}, {"text": "System", "id": "System"}, {"text": "Subsystem", "id": "Subsystem"}];

  public nodeTypes(): Observable<any>
  {
    return Observable.from(this._nodeTypes);
  }
/*
  private dispatcher : Subject<any> = new Subject<any>();
  private treeNodes : any = {};

  private nodes : any = {};

  private BASE_URL : string = 'api/Nodes';

  private getChildNodesUrl(id : number) : string
  {
    return this.BASE_URL + '/' + id + '/nodes';
  }

  private getNodeUrl(id : number) : string
  {
    return this.BASE_URL + '/' + id;
  }

  constructor(private _http:Http){

  }

  persistNode(action: any)
  {
    if (action.name === "STORE_NODE"){
      return this._http.post(action.url, action.node)
      .map((res:Response) => null);
    }
    if (action.name === "EDIT_NODE")
    {
      return this._http.put(action.url, action.node)
      .map((res:Response) => null);
    }
    if (action.name === "DELETE_NODE"){
      return this._http.delete(action.url)
      .map((res:Response) => null);
    }
  }

  dispatchAction(action : any){
    this.dispatcher.next(action);
  }
*/
}
