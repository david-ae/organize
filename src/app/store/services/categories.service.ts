import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { Category } from '../models/domain/category';
import { catchError } from 'rxjs';
import { Store as Bank } from './../../store/models/domain/store';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getCategory(id: string) {
    return this.httpClient
      .get<Category>(`${this.categoryApiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getCategories() {
    return this.httpClient
      .get<Category[]>(`${this.categoryApiUrl}`)
      .pipe(catchError(this.handleError));
  }

  createCategory(category: Category) {
    return this.httpClient
      .post<Category>(`${this.categoryApiUrl}`, category)
      .pipe(catchError(this.handleError));
  }
}
