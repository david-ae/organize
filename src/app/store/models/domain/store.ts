import { Item } from './item';
import { User } from './user';

export interface Store {
  id?: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  inventory: Item[];
  categories: string[];
}
