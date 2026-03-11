import { Route } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { SwiperSliderComponent } from './swiper-slider/swiper-slider.component';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { ToastifyComponent } from './toastify/toastify.component';

export const ADVANCED_ROUTES: Route[] = [
  {
    path: 'ratings',
    component: RatingComponent,
    data: { title: 'Ratings' },
  },
  {
    path: 'alert',
    component: SweetalertComponent,
    data: { title: 'Sweet Alert' },
  },
  {
    path: 'swiper',
    component: SwiperSliderComponent,
    data: { title: 'Swiper Slider' },
  },
  {
    path: 'scrollbar',
    component: ScrollbarComponent,
    data: { title: 'Scrollbar' },
  },
  {
    path: 'toastify',
    component: ToastifyComponent,
    data: { title: 'Toastify' },
  },
];
