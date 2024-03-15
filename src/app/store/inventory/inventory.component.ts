import { Component, Inject } from '@angular/core';
import { ItemManagementComponent } from '../../components/item-management/item-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from '../../components/search/search.component';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ItemManagementComponent,
    MatTabsModule,
    SearchComponent,
    MatButtonModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  logChange(index: unknown) {}
}
