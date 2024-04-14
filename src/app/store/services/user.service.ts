import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { User } from '../models/domain/user';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getUser(id: string) {
    return this.httpClient
      .get<User>(`${this.userApiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createUser(user: User) {
    return this.httpClient
      .post<User>(`${this.userApiUrl}`, user)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User) {
    return this.httpClient
      .patch(`${this.userApiUrl}`, user)
      .pipe(catchError(this.handleError));
  }
}
