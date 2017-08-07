/*
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
//import { Http } from '@angular/http';
import { Http , Response } from '@angular/http';
import { TreeNode } from '../tree-node';
import { treeNodeReducer } from './tree-node-reducer';

@Injectable()
export class Store{

  private dispatcher : Subject<any> = new Subject<any>();
  private treeNodes : any = {};

  private nodes : any = {};


  constructor(private _http:Http){
    this.dispatcher.subscribe((action) => this.handleAction(action));
  }

  private handleAction(action : any) {

    if(action.name === 'LOAD_NODES') {
      if (this.nodes[action.id]) {
        this.treeNodes[action.id].next(this.nodes[action.id]);
      }
      else {

        this._http
            .get(action.url)
            .map((res:Response) => res.json())
            .subscribe(res => {
              this.nodes[action.id] = treeNodeReducer(res, action);
              this.treeNodes[action.id].next(this.nodes[action.id]);
            });

      }
    }
    if (action.name === "STORE_NODE"){
      this._http.post(action.url, action.node)
      .subscribe(res => {
        this.nodes[action.id] = null;
        this.handleAction.bind(this,{name: 'LOAD_NODES', url: 'api/Nodes/' + action.id + '/nodes', id: action.id});
      });
    }
    if (action.name === "EDIT_NODE"){
      this._http.put(action.url, action.node)
      .subscribe(res => {
        this.nodes[action.id] = null;
        this.handleAction.bind(this,{name: 'LOAD_NODES', url: 'api/Nodes/' + action.id + '/nodes', id: action.id});
      });
    }
    if (action.name === "DELETE_NODE"){
      this._http.delete(action.url)
      .subscribe(res => {
        this.nodes[action.id] = null;
        this.handleAction.bind(this,{name: 'LOAD_NODES', url: 'api/Nodes/' + action.id + '/nodes', id: action.id});
      });
    }
  }

  getTreeNodes(id : number){
    if(!this.treeNodes.hasOwnProperty(id)){
      this.treeNodes[id] = new Subject<Array<TreeNode>>();
    }
    return this.treeNodes[id].asObservable();
  }



  dispatchAction(action : any){
    this.dispatcher.next(action);
  }
}
*/
