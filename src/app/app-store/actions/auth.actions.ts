import { createAction, props } from '@ngrx/store';
import { SignInDto } from '../../auth/models/sign-in.dto';
import { LoadStoreResponse, SignInResponse } from '../../auth/models/sign-in-response.dto';
import { SignUpDto } from '../../auth/models/sign-up.dto';

export const signIn = createAction(
  '[Sign In] Auth',
  props<{
    credentials: SignInDto;
  }>()
);

export const loadStoreByEmail = createAction(
  '[Load Store] Auth',
  props<{
    email: string;
  }>()
);

export const createStore = createAction(
  '[Create Store] Auth',
  props<{ onboard: SignUpDto }>()
);

export const signedIn = createAction(
  '[SignedIn]  Auth',
  props<{ payload: any }>()
);

export const signUp = createAction(
  '[SignedIn]  Auth',
  props<{ payload: SignInResponse }>()
);

export const loadStore = createAction(
  '[LoadStore]  Auth',
  props<{ payload: LoadStoreResponse }>()
);
export const logout = createAction(
  '[Logout]  Auth',
  props<{ payload: string }>()
);
export const loggedOut = createAction('[Logout]  Auth');

export const loadSpinner = createAction(
  '[Load Spinner] Auth',
  props<{ isLoaded: boolean }>()
);

export const loadAuthException = createAction('[Load Exception] Auth');
