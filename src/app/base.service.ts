import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected readonly authApiUrl = `${environment.Auth}`;
  protected readonly storeApiUrl = `${environment.Stores}`;
  protected readonly categoryApiUrl = `${environment.Categories}`;
  protected readonly saleApiUrl = `${environment.Sales}`;
  protected readonly userApiUrl = `${environment.Users}`;

  ACCESS_TOKEN = 'ACCESS_TOKEN';
  REFRESH_TOKEN = 'REFRESH_TOKEN';
  constructor() {}

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error));
  }

  saveToLocalStorage(key: string, item: any) {
    localStorage.setItem(key, item);
  }

  getItemFromLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}
