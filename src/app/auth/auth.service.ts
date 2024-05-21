import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { catchError, map, Subject, tap } from 'rxjs';
import { SignInDto } from './models/sign-in.dto';
import { Router } from '@angular/router';
import { LoadStoreResponse, SignInResponse } from './models/sign-in-response.dto';
import { SignUpDto } from './models/sign-up.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  STORE_NAME!: string;
  user_id!: string;

  public refreshToken$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
    this.refreshToken$.subscribe((res) => {
      this.refreshToken();
    });
  }

  signUp(onboard: SignUpDto) {
    return this.httpClient
      .post<SignInResponse>(`${this.authApiUrl}/local/signup`, onboard)
      .pipe(catchError(this.handleError));
  }

  /**
   * Call the API to signin
   * @param email user name
   * @param password password
   * @returns Jwt token if login successfully
   */
  signIn(credentials: SignInDto) {
    //call the API to get token after login successfully
    return this.httpClient
      .post<SignInResponse>(`${this.authApiUrl}/local/signin`, credentials)
      .pipe(catchError(this.handleError));
  }

  loadStoreByEmail(email: string) {
    //call the API to get token after login successfully
    return this.httpClient
      .post<LoadStoreResponse>(`${this.authApiUrl}/details`, email)
      .pipe(catchError(this.handleError));
  }

  /**
   * Clear the token after logout
   */
  logout(userId: string) {
    // this.router.navigateByUrl('/login');
    return this.httpClient
      .post(`${this.authApiUrl}/logout`, userId)
      .pipe(catchError(this.handleError));
  }

  /**
   * Refresh token
   */
  refreshToken() {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem(this.REFRESH_TOKEN)
    );
    return this.httpClient
      .post(`${this.authApiUrl}/refresh`, this.user_id, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }
}
