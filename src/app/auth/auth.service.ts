import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import {
  catchError,
  config,
  map,
  mapTo,
  Observable,
  of,
  share,
  tap,
} from 'rxjs';
import { Store } from '../store/models/domain/store';
import { SignInDto } from './models/sign-in.dto';
import { TokensDto } from './models/tokens.dto';
import { TokenService } from '../common/token.service';
import { Token } from './token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  ACCESS_TOKEN = 'ACCESS_TOKEN';
  REFRESH_TOKEN = 'REFRESH_TOKEN';
  STORE_NAME!: string;
  USER!: string;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    super();
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
      .post<Token>(`${this.authApiUrl}/local/signin`, credentials)
      .pipe(
        tap((token) => {
          console.log('auth service logined ', token);
          //save the token into local storage
          this.tokenService.set(token);
        }),
        map(() => {
          console.log('auth service logined and map ', this.check());
          //check the token whether is valid
          return this.check();
        })
      );
  }

  /**
   * Clear the token after logout
   */
  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl('/login');
  }

  check() {
    return this.tokenService.valid();
  }
}
