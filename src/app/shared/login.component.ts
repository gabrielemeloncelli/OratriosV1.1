import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],

})
export class LoginComponent implements OnInit {

  constructor() { }

  //campi del form del login

  usernameLabel: string = "Username";
  password: string = "Password";
  rememberMe: string = "Remember Me";
  login: string = "BoM-ELE - Manual BoM Electric";
  signIn: string = "Sign-in";

  // username e password dell'utente se queste sono memorizzate nello storage
  @Input() userInfo: any;
  // evento che restituisce l'esito della validazione in echo
  @Output() isAuthorizated: EventEmitter<any> = new EventEmitter();


  //indica se l'utente ha passato o meno l'autenticazione
  isUserAuthorizated: boolean = false;
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
    this.username = (this.userInfo != null) ? this.userInfo.username : "";
    this.userPassword = (this.userInfo != null) ? this.userInfo.password : "";
    this.userRememberMe = (this.userInfo != null) ? this.userInfo.rememberMe : false;

  }



}
