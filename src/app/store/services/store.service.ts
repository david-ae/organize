import { Injectable } from '@angular/core';
import { Store } from '../models/domain/store';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getStore(id: string) {
    return this.httpClient
      .get<Store>(`${this.storeApiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createStore(store: Store) {
    return this.httpClient
      .post<Store>(`${this.storeApiUrl}`, store)
      .pipe(catchError(this.handleError));
  }
}
