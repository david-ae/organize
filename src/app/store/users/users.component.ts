import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  cartService = inject(CartService);

  constructor() {}
}
