import { Injectable } from '@angular/core';
import { Store, items } from '../models/domain/store';
import { Item } from '../models/domain/item';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends BaseService {
  private readonly apiUrl = `${environment.Stores}`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getStore(id: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createStore(store: Store) {
    return this.httpClient
      .post(`${this.apiUrl}`, store)
      .pipe(catchError(this.handleError));
  }
}
