import { Injectable } from '@angular/core';
import { Http,
            Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

import { UserDTO } from '../core/user-DTO';

@Injectable()
export class PlatformUserService {
    private PLATFORM_USER_ADDRESS = '/Oratrios.Api/api/Account/UserLogin';
    private platformUserSubject= new Subject<UserDTO>();
    public platformUser = this.platformUserSubject.asObservable();

    constructor(private http: Http) {}

    getUser() {
        this.http.get(this.PLATFORM_USER_ADDRESS)
        .map((res: Response) => res.json())
        .subscribe((res: UserDTO) => this.platformUserSubject.next(res));
    }



}
