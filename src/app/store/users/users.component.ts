import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  cartService = inject(CartService);

  constructor() {
    this.cartService.addToCart({ name: 'dfdfs', price: 17.09 });
  }
}
