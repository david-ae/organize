import { Injectable, OnDestroy } from '@angular/core';
import { Token } from '../auth/token';
import { JwtToken } from '../auth/jwt-token';
import { currentTimestamp, filterObject } from './util';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService extends BaseService implements OnDestroy {
  ACCESS_TOKEN = 'ACCESS_TOKEN';
  REFRESH_TOKEN = 'REFRESH_TOKEN';

  private _token?: JwtToken;

  constructor() {
    super();
  }

  private get token(): JwtToken | undefined {
    if (!this._token) {
      this._token = new JwtToken(
        this.getItemFromLocalStorage(this.ACCESS_TOKEN as string)
      );
    }
    return this._token;
  }
  set(token?: Token): TokenService {
    this.save(token);
    return this;
  }
  clear(): void {
    this.save();
  }
  valid(): boolean {
    return this.token?.valid() ?? false;
  }
  getUserid(): string {
    return this.token?.user_id ?? '';
  }
  getBearerToken(): string {
    return this.token?.getBearerToken() ?? '';
  }
  ngOnDestroy(): void {}
  /**
   * Save the token to local storage
   * @param token token model
   */
  private save(token?: Token): void {
    this._token = undefined;
    if (!token) {
      this.removeItemFromLocalStorage(this.ACCESS_TOKEN);
    } else {
      const value = Object.assign(
        { access_token: '', token_type: 'Bearer' },
        token,
        {
          exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
        }
      );
      this.saveToLocalStorage(this.key, filterObject(value));
    }
  }
}
