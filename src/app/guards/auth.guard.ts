import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginSuccess, logout, refreshSuccess, selectConnectedUser, selectToken } from '@/store/auth';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);
  private userService = inject(UserService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const actuelRoute=route.url[0].path
    console.log("actuelRoute",actuelRoute);

    return this.getToken().pipe(
      switchMap(token => {
        if (!token) {
          return of(this.router.createUrlTree(['/login']));
        }
        return this.store.select(selectConnectedUser).pipe(
          take(1),
          switchMap(user => {
            if (user) {
              return of(true);
            }
            // Si user null mais token présent, charger l'utilisateur avant de continuer
            return this.loadUser(token).pipe(
              map((result:any ) => {
                // Si chargement réussi, laisser passer
                console.log("ezsq",result);
                
                if (result != null && result.role.name.toLowerCase() === actuelRoute) {
                  return true;
                }
                // Sinon, rediriger vers login
                return this.router.createUrlTree(['/login']);
              })
            );
          })
        );
      })
    );
  }

  /**
   * Retrieves the JWT token from the store, or falls back to localStorage if missing.
   */
  private getToken(): Observable<string | null> {
    return this.store.select(selectToken).pipe(
      take(1),
      map(token => {
        if (token) return token;
        const localToken = localStorage.getItem('token');
        return localToken || null;
      })
    );
  }

  /**
   * Loads the user from the backend using the provided token.
   * On success, dispatches loginSuccess and allows navigation.
   * On error, dispatches logout and redirects to /login.
   */
  private loadUser(token: string): Observable<boolean | UrlTree> {

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.userService.getCurrentUser(headers).pipe(

    map((user: any) => {
      console.log("user auth guard",user);
      
      this.store.dispatch(refreshSuccess({
        user,
        token
      }));
      return user;
    }),

    catchError(() => {
      this.store.dispatch(logout());
      return of(this.router.createUrlTree(['/login']));
    })

  );
}
}
