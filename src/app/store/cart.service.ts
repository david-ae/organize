import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from './models/cartItem';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  constructor() {}

  subTotal = computed(() =>
    this.cartItems().reduce((a, b) => a + b.quantity * b.item.price, 0)
  );

  deliveryFee = computed(() => (this.subTotal() < 100000 ? 999 : 0));

  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax()
  );

  // Add the vehicle to the cart
  // If the item is already in the cart, increase the quantity
  addToCart(newItem: Item): void {
    const index = this.cartItems().findIndex(
      (cartItem) => cartItem.item.name === newItem.name
    );
    if (index === -1) {
      // Not already in the cart, so add with default quantity of 1
      this.cartItems.update((items) => [
        ...items,
        { item: newItem, quantity: 1 },
      ]);
    } else {
      // Already in the cart, so increase the quantity by 1
      this.cartItems.update((items) => [
        ...items.slice(0, index),
        { ...items[index], quantity: items[index].quantity + 1 },
        ...items.slice(index + 1),
      ]);
    }
  }

  // Remove the item from the cart
  removeFromCart(cartItem: CartItem): void {
    // Update the cart with a new array containing
    // all but the filtered out deleted item
    this.cartItems.update((items) =>
      items.filter((item) => item.item.name !== cartItem.item.name)
    );
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    // Update the cart with a new array containing
    // the updated item and all other original items
    this.cartItems.update((items) =>
      items.map((cartItem) =>
        cartItem.item.name === cartItem.item.name
          ? { item: cartItem.item, quantity }
          : cartItem
      )
    );
  }
}
