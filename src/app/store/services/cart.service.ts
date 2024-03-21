import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Item } from '../models/domain/item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$ = new BehaviorSubject<Cart | undefined>(undefined);
  cart = new Cart();

  constructor() {}

  addToCart = (item: Item) => {
    this.cart.addItem(item);
    this.cart$.next(this.cart);
  };

  updateCart = (item: Item, quantity: string) => {
    this.cart.update(item, quantity);
    this.cart$.next(this.cart);
  };

  getSubTotal() {
    return this.cart.getSubTotal();
  }

  getNumberOfItems() {
    return this.cart.getNumberOfItems();
  }

  getItems() {
    return this.cart.getItems();
  }

  getTotal() {
    return this.cart.getTotal();
  }
}
