import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/domain/sale';
import { BaseService } from '../../base.service';
import { catchError } from 'rxjs';
import { SaleSearchRequest } from './models/sales-search-request.model';
import { SaleDto } from '../../app-store/models/sale.dto';
import { UpdateStoreInventoryDto } from '../models/valueobjects/store.dto';
import { CreateSalesDto } from '../models/valueobjects/sale.dto';
import { Store } from '../models/domain/store';

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

  getSalesByQuery(storeId: string, query: SaleSearchRequest) {
    return this.httpClient
      .get<Sale[]>(
        `${this.saleApiUrl}/${storeId}/storeSalesByQuery?${query.sort}`
      )
      .pipe(catchError(this.handleError));
  }

  getSalesByGroupQuery(storeId: string, dateFrom: string, dateTo: string) {
    return this.httpClient
      .get<SaleDto[]>(
        `${this.saleApiUrl}/${storeId}/storeSalesByGroupQuery/${dateFrom}/${dateTo}`
      )
      .pipe(catchError(this.handleError));
  }

  createSale(id: string, sale: Sale) {
    return this.httpClient
      .post<Sale>(`${this.saleApiUrl}/${id}/single`, sale)
      .pipe(catchError(this.handleError));
  }

  createSales(salesRequest: CreateSalesDto) {
    return this.httpClient
      .post<Store>(`${this.saleApiUrl}/multiple`, salesRequest)
      .pipe(catchError(this.handleError));
  }

  updateStatus(id: string, status: string) {
    return this.httpClient
      .patch(`${this.saleApiUrl}/${id}/updateStatus`, status)
      .pipe(catchError(this.handleError));
  }
}
