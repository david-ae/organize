import { Sale } from "../domain/sale";
import { UpdateStoreInventoryDto } from "./store.dto";

export interface CreateSalesDto {
  storeId: string;
  inventory: UpdateStoreInventoryDto;
  sales: Sale[];
}
