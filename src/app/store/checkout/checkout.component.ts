import { MatButtonModule } from '@angular/material/button';
import { CartService } from './../cart.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartService = inject(CartService);

  cart$ = this.cartService.cart$;

  constructor() {}
}
