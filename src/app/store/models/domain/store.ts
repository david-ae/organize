import { Item } from './item';
import { User } from './user';

export interface Store {
  id?: string;
  name: string;
  address: string;
  inventory: Item[];
  categories: string[];
}
