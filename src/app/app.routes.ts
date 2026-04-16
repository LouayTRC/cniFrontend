import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { LoginComponent } from '@component/auth/login/login.component';


export const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //  component:LayoutComponent,
  //  canActivate: [
  //   (url: any) => {
  //     const router = inject(Router)
  //     const currentUser = inject(AuthenticationService)
  //     if (!currentUser.session) {
  //       return router.createUrlTree(['/auth/sign-in'], {
  //         queryParams: { returnUrl: url._routerState.url },
  //       })
  //     }
  //     return true
  //   },
  // ],
  //  loadChildren: () =>
  //     import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  // },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./views/other-pages/other-page.route').then(
  //       (mod) => mod.OTHER_PAGES_ROUTES
  //     ),
  // },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  // },
];
