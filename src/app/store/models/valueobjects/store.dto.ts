// import { ItemDto } from "./item.dto";

import { Item } from '../domain/item';

export interface StoreDto {
  id?: string;
  name: string;
  email: string;
  address: string;
  phoneNumber?: string;
  inventory: Item[];
  categories: string[];
}

export interface UpdateStoreInventoryDto {
  inventories: Item[];
}
