import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { catchError } from 'rxjs';
import { Store } from '../store/models/domain/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getStoreByEmail(email: string) {
    return this.httpClient
      .post<Store>(`${this.storeApiUrl}/details`, { email: email })
      .pipe(catchError(this.handleError));
  }
}
