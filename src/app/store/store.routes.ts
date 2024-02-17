import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemsComponent } from './items/items.component';
import { ShelfComponent } from './shelf/shelf.component';

export const routes: Routes = [
  {
    path: '',
    component: ShelfComponent,
    children: [
      { path: 'items', component: ItemsComponent },
      { path: 'inventory', component: InventoryComponent },
    ],
  },
];
