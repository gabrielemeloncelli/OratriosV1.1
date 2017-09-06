import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http , Response } from '@angular/http';
import { CoreEstServiceConfig } from './core-est-service-config';

@Injectable()
export class CoreEstService {

  constructor(@Optional() config: CoreEstServiceConfig) {}


  public welcome = 'core.est.service.welcome';
  private _nodeTypes: any[] = [{'text': 'Area', 'id': 'Area'}, {'text': 'Zone', 'id': 'Zone'},
   {'text': 'System', 'id': 'System'}, {'text': 'Subsystem', 'id': 'Subsystem'}];

  public nodeTypes(): Observable<any> {
    return Observable.from(this._nodeTypes);
  }
}
