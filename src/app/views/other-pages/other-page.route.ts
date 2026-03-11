import { Route } from '@angular/router'
import { ComingSoonComponent } from './coming-soon/coming-soon.component'
import { MaintenanceComponent } from './maintenance/maintenance.component'
import { Error404Component } from './error-404/error-404.component'

export const OTHER_PAGES_ROUTES: Route[] = [
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
    data: { title: 'Coming Soon' },
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' },
  },
  {
    path: 'error-404',
    component: Error404Component,
    data: { title: 'Page Not Found - 404' },
  },
]
