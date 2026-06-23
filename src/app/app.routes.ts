
import { Routes } from '@angular/router';
import { LoginComponent } from '@component/auth/login/login.component';
import { DashboardComponent } from '@component/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminUsersComponent } from '@component/admin/admin-users/admin-users.component';
import { AddUserComponent } from '@component/admin/add-user/add-user.component';
import { ChatComponent } from '@component/chat/chat.component';
import { OperateurReclamationsComponent } from '@component/operateur/operateur-reclamations/operateur-reclamations.component';
import { AddReclamationComponent } from '@component/operateur/add-recalamation/add-recalamation.component';
import { ChatbotComponent } from '@component/operateur/chatbot/chatbot.component';
import { ReclamationsComponent } from '@component/responsable/reclamations/reclamations.component';
import { ReclamationDashComponent } from '@component/admin/reclamation-dash/reclamation-dash.component';


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
        path: 'chat',
        component: ChatComponent,
        data: { title: 'Messagerie' },
      },
      {
        path: 'reclamations',
        component: ReclamationDashComponent,
        data: { title: 'Gestion des reclamations' },
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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'reclamations',
        component: OperateurReclamationsComponent,
        data: { title: 'Réclamations' },
      },
      {
        path: 'reclamations/add',
        component: AddReclamationComponent,
        data: { title: 'Ajouter Reclamation' },
        
      },
      {
        path: 'reclamations/edit/:id',
        component: AddReclamationComponent,
        data: { title: 'Modifier Reclamation' },
        
      },
      {
        path: 'chat',
        component: ChatComponent,
        data: { title: 'Messagerie' },
      },
      {
        path: 'chatbot',
        component: ChatbotComponent,
        data: { title: 'Chatbot' },
      },
      {
        path: '',
        redirectTo: 'reclamations',
        pathMatch: "full"
      }
    ]
  },
  {
    path: 'responsable',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      
      {
        path: 'chat',
        component: ChatComponent,
        data: { title: 'Messagerie' },
      },
      {
        path: 'reclamations',
        component: ReclamationsComponent,
        data: { title: 'Réclamations' },
        
      },
      {
        path: '',
        redirectTo: 'reclamations',
        pathMatch: "full"
      }
    ]
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
