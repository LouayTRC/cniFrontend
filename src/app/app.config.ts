import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects'

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';
// import { localStorageSyncReducer } from '@store/layout/layout-reducers';
// import { rootReducer } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { CalendarEffects } from '@store/calendar/calendar.effects';
import { DecimalPipe } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideToastr } from 'ngx-toastr'
import { CookieService } from 'ngx-cookie-service';
import { rootReducer } from '@/store';
import { localStorageSyncReducer } from '@/store/layout/layout-reducers';
// import { FakeBackendProvider } from './helper/fake-backend'
// import { AuthenticationEffects } from '@store/authentication/authentication.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    // FakeBackendProvider,
    DecimalPipe,
    CookieService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(rootReducer, { metaReducers: [localStorageSyncReducer] }),
    importProvidersFrom(BrowserAnimationsModule, BrowserModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideToastr({}),
  ]
};
