import { Injectable } from '@angular/core';
import { Store, items } from '../models/domain/store';
import { Item } from '../models/domain/item';

let store: Store = {
  storename: 'Tiktok & Sons',
  email: 'tiktok@gmail.com',
  phoneNumber: '08131344751',
  inventory: items,
};

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  getStore(): Store {
    return store;
  }
  getItems(text: string): Item[] {
    return store.inventory.filter((i) => i.name.includes(text));
  }

  addItem(item: Item) {
    store.inventory.push(item);
  }
}
