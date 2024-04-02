import { Item } from './item';

export interface Sale {
  storeId: string;
  item: Item;
  amount: number;
  transactionDate: Date;
  processedBy: string;
}
