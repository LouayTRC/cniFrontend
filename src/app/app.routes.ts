
import { Routes } from '@angular/router';
import { LoginComponent } from '@component/auth/login/login.component';
import { DashboardComponent } from '@component/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminUsersComponent } from '@component/admin/admin-users/admin-users.component';
import { AddUserComponent } from '@component/admin/add-user/add-user.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        component: AdminUsersComponent,
        data: { title: 'Gestion des utilisateurs' },
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        data: { title: 'Ajouter un utilisateur' },
      },
      {
        path: 'edit-user/:id',
        component: AddUserComponent,
        data: { title: 'Modifier un utilisateur' },
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: "full"
      }
    ]
  },
  {
    path: 'operateur',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable',
    component: DashboardComponent,
    canActivate: [AuthGuard]
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
