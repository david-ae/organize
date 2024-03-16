import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CartService } from '../../store/cart.service';
@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css',
})
export class ItemManagementComponent {
  cartService = inject(CartService);
  logChange(index: unknown) {}

  constructor() {}

  addItem() {
    this.cartService.addToCart({ name: 'sm', price: 17.09 });
  }
}
