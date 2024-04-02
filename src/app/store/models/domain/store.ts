import { Item } from './item';
import { User } from './user';

export interface Store {
  storename: string;
  email: string;
  phoneNumber: string;
  users: User[];
  categories: string[];
  inventory: Item[];
}

export const items: Item[] = [
  { name: 'Blazer', price: 23.8, quantity: 30, category: 'Clothing' },
  { name: 'Plain Trouser', price: 43.8, quantity: 30, category: 'Clothing' },
  { name: 'Packet Shirt', price: 80, quantity: 30, category: 'Clothing' },
  { name: 'Tommy Corparate', price: 20, quantity: 30, category: 'Clothing' },
  { name: 'Canvas', price: 18.8, quantity: 30, category: 'Clothing' },
  { name: 'Bruit', price: 50, quantity: 30, category: 'Clothing' },
  { name: 'Nike Shoes', price: 100, quantity: 30, category: 'Clothing' },
  { name: 'Polo Shirts', price: 150, quantity: 30, category: 'Clothing' },
  { name: 'Chinos trouser', price: 200, quantity: 100, category: 'Clothing' },
];
