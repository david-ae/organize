import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RegistrationComponent } from './auth/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  {
    path: 'store',
    loadChildren: () => import('./store/store.routes').then((r) => r.routes),
  },
  { path: 'signin', component: SigninComponent, title: 'Sign In' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
  },
];
