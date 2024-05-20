import { Injectable } from '@angular/core';
import { Store } from '../models/domain/store';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';
import { catchError, distinctUntilChanged, share } from 'rxjs';
import { Item } from '../models/domain/item';
import { UpdateStoreInventoryDto } from '../models/valueobjects/store.dto';
import { SignUpDto } from '../../auth/models/sign-up.dto';
import { SignInResponse } from '../../auth/models/sign-in-response.dto';

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

  createStore(onboard: SignUpDto) {
    return this.httpClient
      .post<SignInResponse>(`${this.authApiUrl}/local/signup`, onboard)
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

  getStoreCategories(id: string) {
    return this.httpClient
      .get<Store>(`${this.storeApiUrl}/${id}/storeCategories`)
      .pipe(share());
  }

  getStoreItemByCategory(id: string, category: string) {
    return this.httpClient
      .get<Store>(`${this.storeApiUrl}/${id}/storeItems?category=${category}`)
      .pipe(share());
  }
}
