import { Component } from '@angular/core';
import { ItemManagementComponent } from '../../components/item-management/item-management.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports:[ItemManagementComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
