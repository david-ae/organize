import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'inventory', component: InventoryComponent, title: 'Inventory' },
      { path: 'users', component: UsersComponent, title: 'Users' },
      { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
      { path: 'shop', component: ShopComponent, title: 'Shop' },
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: 'sales', component: SalesComponent, title: 'Sales' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
    ],
  },
];
