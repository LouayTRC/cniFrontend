import { Route } from '@angular/router'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { ResetPassComponent } from './reset-pass/reset-pass.component'
import { LockScreenComponent } from './lock-screen/lock-screen.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { title: 'Sign In' },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { title: 'Sign Up' },
  },
  {
    path: 'reset-pass',
    component: ResetPassComponent,
    data: { title: 'Reset Password' },
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
    data: { title: 'Lock Screen' },
  },
]
