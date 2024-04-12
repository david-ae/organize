import { SaleState } from './../../app-store/reducers/sale.reducer';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { Item } from '../models/domain/item';
import { CartItem } from '../models/cartItem';
import { select, Store } from '@ngrx/store';
import { Sale } from '../models/domain/sale';
import {
  getStoreDetails,
  StoreState,
} from '../../app-store/reducers/store.reducer';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store as Bank } from './../models/domain/store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  saleStore = inject(Store<SaleState>);
  store = inject(Store<StoreState>);
  cartService = inject(CartService);

  cart$ = this.cartService.currentCart;
  store$!: Observable<Bank>;
  currentStore!: Bank;
  cart!: Cart;

  cartForm!: FormGroup;

  unsubcriber$ = new Subject<void>();

  constructor() {}
  ngOnDestroy(): void {
    this.unsubcriber$.next();
    this.unsubcriber$.complete();
  }

  ngOnInit(): void {
    this.cartForm = new FormGroup({});
    this.cart$.subscribe((cart) => (this.cart = cart as Cart));
    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubcriber$)
    );

    this.store$.subscribe((store) => (this.currentStore = store));
  }

  incrementQuantity(id: string | undefined) {
    if (this.cart) {
      for (let cartItem of this.cart.cartItems) {
        if (cartItem.item.id === id) {
          const qty = cartItem.getQuantity() + 1;
          this.cart.update(cartItem.item, qty.toString());
          this.cartService.cart$.next(this.cart);
          break;
        }
      }
    }
  }

  decrementQuantity(id: string | undefined) {
    if (this.cart) {
      for (let cartItem of this.cart.cartItems) {
        if (cartItem.item.id === id) {
          const qty = cartItem.getQuantity() - 1;
          this.cart.update(cartItem.item, qty.toString());
          this.cartService.cart$.next(this.cart);
          break;
        }
      }
    }
  }

  removeItem(item: Item) {
    if (this.cart) {
      this.cart.removeItem(item);
      this.cartService.cart$.next(this.cart);
    }
  }

  clearCart() {
    this.cart.clear();
    this.cartService.cart$.next(undefined);
  }

  onChange(item: CartItem) {
    console.log(item);
  }

  addSale() {}

  // private prepareSales() {

  //   while (let item of this.cart.cartItems) {
  //     const newSale: Sale = {
  //       storeId: this.currentStore.id as string,

  //     };
  //   }
  // }
}
