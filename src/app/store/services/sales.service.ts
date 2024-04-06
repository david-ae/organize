import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/domain/sale';
import { BaseService } from '../../base.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getSales(storeId: string) {
    return this.httpClient
      .get<Sale[]>(`${this.saleApiUrl}/${storeId}/storeSales`)
      .pipe(catchError(this.handleError));
  }

  createSale(sale: Sale) {
    return this.httpClient
      .post<Sale>(`${this.saleApiUrl}`, sale)
      .pipe(catchError(this.handleError));
  }

  updateStatus(id: string, status: string) {
    return this.httpClient
      .patch(`${this.saleApiUrl}/${id}/updateStatus`, status)
      .pipe(catchError(this.handleError));
  }
}
