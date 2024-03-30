import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SaleComponent } from './components/sale/sale.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sale', pathMatch: 'full' },
  {
    path: 'store',
    loadChildren: () => import('./store/store.routes').then((r) => r.routes),
  },
  { path: 'signin', component: SigninComponent, title: 'Sign In' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { path: 'sale', component: SaleComponent, title: 'Sale' },
];
