import { Item } from './domain/item';

export class CartItem {
  item!: Item;
  quantity!: number;

  constructor(private _item: Item) {
    this.item = _item;
    this.quantity = 1;
  }

  getItem(): Item {
    return this.item;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  getTotal(): number {
    let amount = 0;
    amount = this.getQuantity() * this.item.price;
    return amount;
  }
}
