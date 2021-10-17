import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/internal/operators';
import { Observable, of, throwError } from 'rxjs';
import { IAuthService } from './auth.service.interface';
import { AuthToken, LoginResponse } from './models/login-response.model';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

const mockLoginResponse: AuthToken = {
  token: 'token',
  redirect_url: '/',
  refresh_token: 'refresh_token',
};

const httpOptions: { headers: any; observe: any } = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('salut');
    //return this.http.get('http://localhost:3000', httpOptions);
    return of({ body: mockLoginResponse }).pipe(delay(2000));
  }

  checkAuth(token: AuthToken): Observable<any> {
    return of({ body: { validToken: true } }).pipe(delay(2000));
  }

  logout() {
    return of(true);
  }
}
