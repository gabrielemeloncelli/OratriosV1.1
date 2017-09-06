import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {
  Http,
  Response
} from '@angular/http';

import { TreeNode } from '../lazy-loaded-tree-view/tree-node';
import { treeNodeReducer } from '../lazy-loaded-tree-view/tree-node-reducer';
import { treeNodeReducerSingle } from '../lazy-loaded-tree-view/tree-node-reducer-single';
import { UiStatusService } from '../core/ui-status.service';
import { NodePositionsUpdate } from './node-positions-update';

@Injectable()
export class TreeNodeService {


  private dispatcher: Subject<any> = new Subject<any>();
  private treeNodes: any = {};

  private nodePositionUpdateSubject = new Subject<NodePositionsUpdate>();
  public nodePositionsUpdate = this.nodePositionUpdateSubject.asObservable();

  private nodes: any = {};

  private BASE_URL = 'api/Nodes';

  private getChildNodesUrl(id: number, projectDisciplineId: number): string {
    return this.BASE_URL + '/' + id + '/' + projectDisciplineId + '/nodes';
  }

  private getNodeUrl(id: number): string {
    return this.BASE_URL + '/' + id;
  }

  constructor(private _http: Http) {
    this.dispatcher.subscribe((action) => this.handleAction(action));
  }

  private handleAction(action: any) {

    if (action.name === 'LOAD_NODES') {
      if (this.nodes[action.id]) {
        this.treeNodes[action.id].next(this.nodes[action.id]);
      } else {

        this._http
          .get(action.url)
          .map((res: Response) => res.json())
          .subscribe(res => {
            this.nodes[action.id] = treeNodeReducer(res);
            this.treeNodes[action.id].next(this.nodes[action.id]);
          });

      }
    }
    if (action.name === 'STORE_NODE') {
      this._http.post(action.url, action.node)
        .subscribe(res => {
          this.nodes[action.id] = null;
          this.handleAction.bind(this, { name: 'LOAD_NODES',
            url: 'api/Nodes/' + action.id + '/' + action.node.projectDisciplineId + '/nodes', id: action.id });
        },
        error => { throw(error); });
    }
    if (action.name === 'EDIT_NODE') {
      this._http.put(action.url, action.node)
        .subscribe(res => {
          this.nodes[action.id] = null;
          this.handleAction.bind(this, { name: 'LOAD_NODES',
            url: 'api/Nodes/' + action.id + '/' + action.node.projectDisciplineId + '/nodes', id: action.id });
        });
    }
    if (action.name === 'DELETE_NODE') {
      this._http.delete(action.url)
        .subscribe(res => {
          this.nodes[action.id] = null;
          this.handleAction.bind(this, { name: 'LOAD_NODES',
            url: 'api/Nodes/' + action.id + '/' + action.node.projectDisciplineId + '/nodes', id: action.id });
        });
    }
  }

  getTreeNodes(id: number) {
    if (!this.treeNodes.hasOwnProperty(id)) {
      this.treeNodes[id] = new Subject<Array<TreeNode>>();
    }
    return this.treeNodes[id].asObservable();
  }

  persistNode(action: any) {
    if (action.name === 'STORE_NODE') {
      return this._http.post(action.url, action.node)
        .map((res: Response) => null)
        .catch(this.handleError);
    }
    if (action.name === 'EDIT_NODE') {
      return this._http.put(action.url, action.node)
        .map((res: Response) => null);
    }
    if (action.name === 'DELETE_NODE') {
      return this._http.delete(action.url)
        .map((res: Response) => null);
    }
  }

  dispatchAction(action: any) {
    this.dispatcher.next(action);
  }

  getSingleNode(id: number) {
    return this._http
      .get(this.getNodeUrl(id))
      .map((res: Response) => treeNodeReducerSingle(res.json()));
  }

  fetchTreeNodes(id: number, projectDisciplineId: number) {
    return this._http
      .get(this.getChildNodesUrl(id, projectDisciplineId))
      .map((res: Response) => treeNodeReducer(res.json()));

  }

  handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    let status = 0;
    let message = '';
    if (error instanceof Response) {
      status = error.status;
      message = error.text();
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw({ message: message, status: status });
  }

  updateNodePositions(id: number) {
    this._http
    .get(this.BASE_URL + '/' + id.toString() + '/node-update')
    .map((res: Response) => res.json())
    .subscribe((upd: NodePositionsUpdate) => this.nodePositionUpdateSubject.next(upd));
  }
}
