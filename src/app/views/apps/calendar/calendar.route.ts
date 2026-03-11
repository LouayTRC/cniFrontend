import type { Route } from "@angular/router";
import { ScheduleComponent } from "./schedule/schedule.component";
import { IntegrationComponent } from "./integration/integration.component";

export const CALENDAR_ROUTES: Route[] = [
  {
    path: 'schedule',
    component: ScheduleComponent,
    data: { title: 'Schedule' },
  },
  {
    path: 'integration',
    component: IntegrationComponent,
    data: { title: 'Integration' },
  },
]