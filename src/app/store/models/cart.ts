import { CartItem } from './cartItem';
import { Item } from './domain/item';

export class Cart {
  cartItems!: CartItem[];
  numberOfItems!: number;
  total!: number;

  constructor() {
    this.cartItems = [];
    this.numberOfItems = 0;
    this.total = 0;
  }

  addItem(item: Item) {
    let newItem = true;
    for (let cartItem of this.cartItems) {
      if (cartItem.getItem().id === item.id) {
        newItem = false;
        cartItem.incrementQuantity();
      }
    }
    if (newItem) {
      let cartItem = new CartItem(item);
      this.cartItems.push(cartItem);
    }
  }

  update(item: Item, quantity: string) {
    let qty = -1;

    qty = parseInt(quantity);

    if (qty >= 0) {
      let cartItem = null;

      for (let sCartItem of this.cartItems) {
        if (sCartItem.getItem().id === item.id) {
          if (qty != 0) {
            sCartItem.setQuantity(qty);
          } else {
            cartItem = sCartItem;
            break;
          }
        }
      }

      if (item != null) {
        for (let sCartItem of this.cartItems) {
          if (sCartItem.getItem().id == item.id) {
            var index = this.cartItems.indexOf(sCartItem);
            this.cartItems.slice(index, 1);
          }
        }
      }
    }
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  getNumberOfItems() {
    let numberOfItems = 0;

    for (let cartItem of this.cartItems) {
      numberOfItems += cartItem.getQuantity();
    }

    return numberOfItems;
  }

  getSubTotal() {
    let amount = 0;

    for (let cartItem of this.cartItems) {
      const item = cartItem.getItem();
      amount += cartItem.getQuantity() * item.price;
    }

    return amount;
  }

  calculateTotal(surcharge: number) {
    let amount = 0;

    amount = this.getSubTotal();
    amount += surcharge;

    this.total = amount;
  }

  getTotal(): number {
    return this.total;
  }

  clear() {
    this.cartItems.slice(this.cartItems.length);
  }
}
