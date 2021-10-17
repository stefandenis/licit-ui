import { Observable } from 'rxjs';
import { AuthToken, LoginResponse } from './models/login-response.model';

export interface IAuthService {
  login(email: string, password: string): Observable<AuthToken>;
}
