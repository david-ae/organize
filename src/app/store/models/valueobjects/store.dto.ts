import { ItemDto } from "./item.dto";

export interface StoreDto {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  inventories: ItemDto[];
  categories: string[];
}
