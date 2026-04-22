import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '@/app/utils/enums';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) => AuthActions.loginSuccess({ user: response.user, token: response.token })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('token', token);
          // Redirection based on role
          const role = user?.role?.name;
          if (role === UserRole.admin) {
            this.router.navigate(['/admin']);
          } else if (role === UserRole.operateur) {
            this.router.navigate(['/operateur']);
          } else {
            this.router.navigate(['/responsable']);
          }
        })
      ),
    { dispatch: false }
  );

refreshSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('token', token);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
