import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthService } from './auth.service.interface';
import { LoginResponse } from './models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(email: string, password: string) {
    console.log('salut din auth servcie');
  }
}
