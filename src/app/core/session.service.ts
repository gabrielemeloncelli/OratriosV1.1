import { Injectable,
          Optional } from '@angular/core';
import { Response,
          Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

import { UserDTO } from './user-DTO';






@Injectable()
export class SessionService {
  private _userLogin = 'donald';
  private _userIsAdministrator = false;
  private _userSubject: Subject<UserDTO>;
  private USERDATA_BASE_URL = '/Oratrios.Api/api/Account/UserData';

  constructor(private _http: Http) {
    this._userSubject = new Subject<UserDTO>();
  }

  get user(): Observable<UserDTO> {
    return this._userSubject.asObservable();
  }

  retrieveUserData(platformAuthenticatedUserName: string): void {

    this._http
        .get(this.USERDATA_BASE_URL + '?platformAuthenticatedUserName=' + encodeURIComponent(platformAuthenticatedUserName))
        .map((res: Response) => res.json())
        .subscribe((res: UserDTO) => {
          this._userSubject.next(res);

        });


  }

}
