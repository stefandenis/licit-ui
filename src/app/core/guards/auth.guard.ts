import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { isAuthenticated } from 'src/app/store/auth/auth.selectors';
import { AuthService } from '../auth/auth.mock.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean;
  constructor(public store: Store, public router: Router) {
    this.store.pipe(select(isAuthenticated)).subscribe((value) => {
      this.isAuthenticated = value;
    });
  }
  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
