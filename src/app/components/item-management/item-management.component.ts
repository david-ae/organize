import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css'
})
export class ItemManagementComponent {
  logChange(index: unknown) {
    console.log(index);
  }
}
