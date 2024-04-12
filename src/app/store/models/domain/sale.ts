import { Item } from './item';

export interface Sale {
  id?: string;
  storeId: string;
  itemId: string;
  itemName: string;
  expectedAmount: number;
  actualAmount: number;
  processedBy: string;
}
