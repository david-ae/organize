import { Status } from '../enums/status.enum';
import { Item } from './item';

export interface Sale {
  id?: string;
  storeId: string;
  itemId: string;
  itemName: string;
  expectedAmount: number;
  actualAmount: number;
  status: string;
  processedBy?: string;
}

export interface CreateSale {
  storeId: string;
  itemId: string;
  itemName: string;
  expectedAmount: number;
  actualAmount: number;
  status: string;
}
