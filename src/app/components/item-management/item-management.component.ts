import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css',
})
export class ItemManagementComponent {}
