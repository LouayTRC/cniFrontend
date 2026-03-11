import { Router, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { inject } from '@angular/core';
import { AuthenticationService } from '@core/services/auth.service'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: '',
   component:LayoutComponent,
   canActivate: [
    (url: any) => {
      const router = inject(Router)
      const currentUser = inject(AuthenticationService)
      if (!currentUser.session) {
        return router.createUrlTree(['/auth/sign-in'], {
          queryParams: { returnUrl: url._routerState.url },
        })
      }
      return true
    },
  ],
   loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./views/other-pages/other-page.route').then(
        (mod) => mod.OTHER_PAGES_ROUTES
      ),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
];
