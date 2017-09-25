import { Injectable } from '@angular/core';
import { Http,
            Response,
            Headers } from '@angular/http';

import { Subject } from 'rxjs/Subject';

import { TokenStructure } from './token-structure';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class TokenService {
    private TOKEN_URL = 'TOKEN';
    private tokenValueSubject = new Subject<TokenStructure>();
    public tokenValue = this.tokenValueSubject.asObservable();
    private errorSubject = new Subject<string>();
    public error = this.errorSubject.asObservable();
    private emptyObservable = new Observable<Response>();

    constructor(private http: Http) {}

    public signIn(username: string, password: string, platformUserName: string) {
        const payload = 'grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        const headers = new Headers();
        headers.append('oratrios-plt', platformUserName);
        this.http.post(this.TOKEN_URL, payload, { headers: headers })
        .map((res: Response) => res.json())
        .subscribe(res => this.processResponse(res),
         err => {
            this.errorSubject.next('Authentication failed');
         }
        );

    }

    private processResponse(response: any) {
        const result = new TokenStructure();
        result.access_token = response['access_token'];
        result.token_type = response ['token_type'];
        result.userName = response['userName'];
        result.issued = new Date(Date.parse(response['.issued']));
        result.expires = new Date(Date.parse(response['.expires']));
        result.expires_in = response['expires_in'];
        this.tokenValueSubject.next(result);
    }

    handleError(error: Response | any) {
        this.errorSubject.next('Authentication failed');
        return Observable.throw('');
    }

}
