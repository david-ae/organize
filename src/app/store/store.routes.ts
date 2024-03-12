import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'inventory', component: InventoryComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];
