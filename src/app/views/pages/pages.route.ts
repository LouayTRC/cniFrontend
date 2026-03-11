import type { Route } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { FaqsComponent } from "./faqs/faqs.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { PricingComponent } from "./pricing/pricing.component";
import { Error404AltComponent } from "./error-404-alt/error-404-alt.component";

export const PAGES_ROUTES: Route[] = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: 'Welcome' },
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    data: { title: 'FAQs' },
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    data: { title: 'Timeline' },
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: { title: 'Pricing' },
  },
  {
    path: 'error-404-alt',
    component: Error404AltComponent,
    data: { title: '404' },
  },
]