import { Item } from './item';
import { User } from './user';

export interface Store {
  id?: string;
  storename: string;
  email: string;
  phoneNumber: string;
  users: User[];
  inventories: Item[];
  categories: string[];
}
