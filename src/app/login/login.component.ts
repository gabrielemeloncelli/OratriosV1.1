import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiStatusService } from '../core/ui-status.service';

import { PlatformUserService } from './platform-user.service';
import { TokenService } from './token.service';



@Component({
  selector: 'mbe-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  public loaded = false;
  public useOtherUser = false;
  public errorMessage = '';

  constructor(private router: Router,
    public uiStatuService: UiStatusService,
    private platformUserService: PlatformUserService,
    private tokenService: TokenService) { }

  // campi del form del login

  usernameLabel = 'Username';
  password = 'Password';
  rememberMe = 'Remember Me';
  login = 'BoM ELE - Manual BoM Electrical';
  signIn = 'Sign-in';

  // username e password dell'utente se queste sono memorizzate nello storage
  // @Input() userInfo: any;
  // evento che restituisce l'esito della validazione in echo
  // @Output() isAuthorizated: EventEmitter<any> = new EventEmitter();


  // indica se l'utente ha passato o meno l'autenticazione
  isUserAuthorizated = false;
  // variabile in cui memorizzo lo username
  username: string;
  // variabile in cui memorizzo la password
  userPassword: string;
  // variabile in cui memorizzo se l'utente voglia o meno essere ricordato nei prossimi accessi
  userRememberMe: boolean;
  // flag per la gestione del login durante la fase di autorizzazione
  loading: boolean;


  ngOnInit() {
    this.loading = false;
    this.tokenService.tokenValue.subscribe(
      token => {
        this.errorMessage = '';
        this.uiStatuService.authToken = token.access_token;
        this.uiStatuService.platformAuthenticatedUserName = token.userName;
        this.router.navigate(['select-project']);
      }
    );
    this.tokenService.error.subscribe(
      error => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
    // Get the username of the user autehenticated by the platform
    this.platformUserService.platformUser.subscribe(user => {
      this.uiStatuService.platformAuthenticatedUserName = user.code;
      this.useOtherUser = !user.code;
      this.loaded = true;

    });
    this.platformUserService.getUser();
    // this.username = (this.userInfo != null) ? this.userInfo.username : "";
    // this.userPassword = (this.userInfo != null) ? this.userInfo.password : "";
    // this.userRememberMe = (this.userInfo != null) ? this.userInfo.rememberMe : false;

  }

  private singnInPvt(usePlatform: boolean) {
    this.errorMessage = 'Authenticating ...';
    this.loading = true;
    if (usePlatform) {
      this.tokenService.signIn(this.uiStatuService.platformAuthenticatedUserName, '', this.uiStatuService.platformAuthenticatedUserName);
    } else {
      this.tokenService.signIn(this.username, this.userPassword, '');
    }
  }

  public SignInPlatform() {
    this.singnInPvt(true);
  }

  public SignIn() {
    this.singnInPvt(false);
  }
}
