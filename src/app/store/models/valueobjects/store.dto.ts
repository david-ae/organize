// import { ItemDto } from "./item.dto";

import { Item } from "../domain/item";

// export interface StoreDto {
//   name: string;
//   email: string;
//   address: string;
//   phoneNumber: string;
//   inventories: ItemDto[];
//   categories: string[];
// }

export interface UpdateStoreInventoryDto{
  inventories: Item[];
}
