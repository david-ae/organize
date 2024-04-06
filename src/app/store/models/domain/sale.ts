import { Item } from './item';

export interface Sale {
  storeId: string;
  item: Item;
  expectedAmount: number;
  actualAmount: number;
  transactionDate: Date;
  processedBy: string;
}
