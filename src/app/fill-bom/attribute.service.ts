import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Attribute } from './attribute';
import { AttributeStoreService } from './attribute-store.service';

@Injectable()
export class AttributeService{
  private _attributes: BehaviorSubject<Array<Attribute>> = new BehaviorSubject(new Array<Attribute>());
  public attributes: Observable<Array<Attribute>> = this._attributes.asObservable();


constructor(private _storeService: AttributeStoreService){}


  getAll(projDisciplineId: number)
  {
    this._storeService.getAll(projDisciplineId).subscribe( attributes => this._attributes.next(attributes));
  }

  clear()
  {
    this._attributes.next(new Array<Attribute>());
  }




}
