import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import { AuthService } from 'src/app/core/auth/auth.mock.service';
import {
  AuthToken,
  LoginResponse,
} from 'src/app/core/auth/models/login-response.model';
import { UserService } from 'src/app/core/services/user/user.service';
import * as fromAuthActions from './auth.actions';
import { LoadingService } from '../../core/services/loading/loading.service';
import { displayProfile } from './auth.selectors';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      switchMap((action) => {
        this.loadingService.startLoadingScreen();
        console.log('login action', action);
        console.log('email is: ', action.email);
        return this.authService.login(action.email, action.password).pipe(
          map((loginResponse: HttpResponse<AuthToken>) => {
            console.log(loginResponse.body);
            localStorage.setItem(
              'token_licit',
              JSON.stringify(loginResponse.body)
            );
            return fromAuthActions.loginComplete({
              isLoggedIn: true,
            });
          }),
          catchError((error) => {
            //handle error
            //show some error message
            console.log(error);
            return of(
              fromAuthActions.loginComplete({
                isLoggedIn: false,
              })
            );
          })
        );
      })
    )
  );

  loginComplete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.loginComplete),
      switchMap((action) => {
        console.log(action.isLoggedIn);
        if (action.isLoggedIn) {
          this.router.navigate(['..']);
        }
        return this.getDisplayProfileIfLoggedIn(action.isLoggedIn);
      })
    );
  });

  getDisplayProfile$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAuthActions.getDisplayProfile),
        tap(() => {
          this.loadingService.stopLoadingScreen();
        })
      );
    },
    { dispatch: false }
  );

  checkauth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.checkAuth),
      switchMap(() => {
        console.log('check auth');
        this.loadingService.startLoadingScreen();

        var token = localStorage.getItem('token_licit');
        if (token != null) {
          var tokenJSON: AuthToken = JSON.parse(token);
          return this.authService.checkAuth(tokenJSON).pipe(
            map((response: HttpResponse<boolean | AuthToken>) => {
              if (response.status === 200) {
                localStorage.setItem(
                  'token_licit',
                  JSON.stringify(response.body)
                );
              }
              return fromAuthActions.checkAuthComplete({
                isLoggedIn: true,
              });
            }),
            catchError((error) => {
              console.log(error);
              return of(
                fromAuthActions.checkAuthComplete({ isLoggedIn: false })
              );
            })
          );
        } else {
          return of(
            fromAuthActions.checkAuthComplete({
              isLoggedIn: false,
            })
          );
        }
      })
    )
  );

  checkAuthComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.checkAuthComplete),
      switchMap((action) => {
        return this.getDisplayProfileIfLoggedIn(action.isLoggedIn);
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      tap(() => {
        localStorage.removeItem('token_licit');
        //this.authService.logout();
      }),
      map(() => fromAuthActions.logoutComplete())
    )
  );

  getDisplayProfileIfLoggedIn(isLoggedIn: any) {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      console.log('Login Complete');
      return this.userService.getUserProfileData().pipe(
        map((displayProfile) => {
          return fromAuthActions.getDisplayProfile(displayProfile);
        })
      );
    } else {
      return of(fromAuthActions.getDisplayProfile({ profile: null }));
    }
  }
}
