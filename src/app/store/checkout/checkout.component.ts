import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  cartForm!: FormGroup;
  cart$ = this.cartService.cart$;

  constructor() {}
  ngOnInit(): void {
    this.cartForm = new FormGroup({});
  }

  incrementQuantity(id: string | undefined) {
    this.cart$.subscribe((cart) => {
      if (cart) {
        for (let cartItem of cart.cartItems) {
          if (cartItem.item.id === id) {
            const qty = cartItem.getQuantity() + 1;
            cart.update(cartItem.item, qty.toString());
            break;
          }
        }
      }
    });
  }

  decrementQuantity(id: string | undefined) {
    this.cart$.subscribe((cart) => {
      if (cart) {
        for (let cartItem of cart.cartItems) {
          if (cartItem.item.id === id) {
            const qty = cartItem.getQuantity() - 1;
            cart.update(cartItem.item, qty.toString());
            break;
          }
        }
      }
    });
  }

  addSale() {}
}
