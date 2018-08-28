import { Injectable } from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { TreeNode } from '../lazy-loaded-tree-view/tree-node';
import { NodePath } from './node-path';


@Injectable()
export class NodeSelectorService {
  public lastSelectedNode: TreeNode = new TreeNode(0, '', '', '', 0, false, '', false, null, null, null);

  private _selectedNodeSource = new Subject<TreeNode>();
  private _selectedNodePathSource = new Subject<string>();
  private BASE_URL = 'api/nodes/';

  selectedNode = this._selectedNodeSource.asObservable();
  selectedNodePath = this._selectedNodePathSource.asObservable();

  constructor(private http: Http) {
  }


  selectNode(node: TreeNode) {
    if (node.id > 0) {
      this.lastSelectedNode = node;
      this._selectedNodePathSource.next('');
      this.getPath();
      this._selectedNodeSource.next(node);
    }
  }

  refreshNode() {
    this.selectNode(this.lastSelectedNode);
  }

  getPath() {
    this.http.get(this.BASE_URL + this.lastSelectedNode.id.toString() + '/path')
      .map((r: Response) => r.json())
      .subscribe((t: any) => {
        this._selectedNodePathSource.next((<NodePath>t).path);

      });
  }

}
