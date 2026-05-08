import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects'
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { AuthEffects } from '../store/auth/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DecimalPipe } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideToastr } from 'ngx-toastr'
import { CookieService } from 'ngx-cookie-service';
import { rootReducer } from '@/store';
import { localStorageSyncReducer } from '@/store/layout/layout-reducers';
import { firebaseConfig } from './utils/api';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [
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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideMessaging(() => getMessaging()),
    provideFirestore(() => getFirestore()),
  ]
};
