import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OnboardingComponent } from './auth/onboarding/onboarding.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: 'store',
    loadChildren: () => import('./store/store.routes').then((r) => r.routes),
  },
  { path: 'signin', component: SigninComponent, title: 'Sign In' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    title: 'Onboarding',
  },
];
