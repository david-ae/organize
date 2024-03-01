import { Component } from '@angular/core';
import { ItemManagementComponent } from '../../components/item-management/item-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ItemManagementComponent, MatTabsModule, MatButtonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  logChange(index: unknown) {
    console.log(index);
  }
}
