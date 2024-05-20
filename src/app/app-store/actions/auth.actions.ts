import { createAction, props } from '@ngrx/store';
import { SignInDto } from '../../auth/models/sign-in.dto';
import { SignInResponse } from '../../auth/models/sign-in-response.dto';
import { SignUpDto } from '../../auth/models/sign-up.dto';

export const signIn = createAction(
  '[Sign In] Auth',
  props<{
    credentials: SignInDto;
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
)

;
export const logout = createAction(
  '[Logout]  Auth',
  props<{ payload: string }>()
);
export const loggedOut = createAction(
  '[Logout]  Auth',
);

export const loadSpinner = createAction(
  '[Load Spinner] Auth',
  props<{ isLoaded: boolean }>()
);

export const loadAuthException = createAction('[Load Exception] Auth');
