import { Route } from "@angular/router";
import { AdminUsersComponent } from "@component/admin/admin-users/admin-users.component";

export const ADMIN_ROUTES: Route[] = [
  {
    path: 'users',
    component: AdminUsersComponent,
    data: { title: 'Gestion des utilisateurs' },
  },
  {
    path:'',
    redirectTo:'users',
    pathMatch:"full"
  }
]


export const RESPONSABLE_ROUTES: Route[] = [
  {
    path: 'dossiers',
    component: AdminUsersComponent,
    data: { title: 'Gestion des dossiers' },
  },
  {
    path:'',
    redirectTo:'dossiers',
    pathMatch:"full"
  }
]