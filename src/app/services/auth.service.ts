import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../config';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient){};

  form: FormGroup= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  login(): Observable<boolean>{
    return this.http.post<any>(`${config.apiUrl}/api/auth/login`, this.form.value)
          .pipe(
            tap(data => this.doLoginUser(data)),
            mapTo(true),
            catchError(err => {
              alert(err.error);
              return of(false);
            })
          )
  }

  refreshToken() {
    console.log('refreshToken');
    let token = this.getJwtToken();
    return this.http.post<any>(`${config.apiUrl}/api/auth/refresh?token=${token}`, null).pipe(tap((tokens: any) => {
      console.log(tokens);
      this.storeTokens(tokens.token);
    }));
  }

  private doLoginUser(data: any) {
    this.storeTokens(data);
  }

  getDataToken() {
    let token = this.getJwtToken();
    console.log('getDataToken');
    console.log(typeof token);
    if(token && token !== 'undefined')
      return jwtDecode(token);
      console.log('haha');
    return false;
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken():string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  onTest() {
    return this.http.get(`${config.apiUrl}/api/departments/get-all`);
    // return this.http.get(`${config.apiUrl}/api/employees/get-all`);
  }
}
