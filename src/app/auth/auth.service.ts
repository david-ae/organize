import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { catchError, map, tap } from 'rxjs';
import { SignInDto } from './models/sign-in.dto';
import { Router } from '@angular/router';
import { SignInResponse } from './models/sign-in-response.dto';
import { SignUpDto } from './models/sign-up.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  STORE_NAME!: string;
  USER!: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
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

  /**
   * Clear the token after logout
   */
  logout(userId: string) {
    // this.router.navigateByUrl('/login');
    return this.httpClient
      .post(`${this.authApiUrl}/logout`, userId)
      .pipe(catchError(this.handleError));
  }
}
