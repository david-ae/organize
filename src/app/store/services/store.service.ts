import { Injectable } from '@angular/core';
import { Store } from '../models/domain/store';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';
import { catchError, distinctUntilChanged, share } from 'rxjs';
import { Item } from '../models/domain/item';
import { UpdateStoreInventoryDto } from '../models/valueobjects/store.dto';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getStore(id: string) {
    return this.httpClient.get<Store>(`${this.storeApiUrl}/${id}`);
  }

  createStore(store: Store) {
    return this.httpClient
      .post<Store>(`${this.storeApiUrl}`, store)
      .pipe(share(), catchError(this.handleError));
  }

  addCategoriesToStore(id: string, categories: string[]) {
    return this.httpClient
      .patch<Store>(`${this.storeApiUrl}/${id}/categories`, categories)
      .pipe(catchError(this.handleError), share());
  }

  addItemToStoreInventory(id: string, item: Item) {
    return this.httpClient
      .patch<Store>(`${this.storeApiUrl}/${id}/inventory-item`, item)
      .pipe(catchError(this.handleError), share());
  }

  updateStoreInventory(id: string, store: UpdateStoreInventoryDto) {
    return this.httpClient
      .patch<Store>(`${this.storeApiUrl}/${id}/inventory`, store)
      .pipe(catchError(this.handleError), share());
  }

  getStoreByEmail(email: string) {
    return this.httpClient
      .post<Store>(`${this.storeApiUrl}/details`, { email: email })
      .pipe(share());
  }
}
