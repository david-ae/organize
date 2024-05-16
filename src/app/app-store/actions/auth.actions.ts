import { createAction, props } from '@ngrx/store';
import { SignInDto } from '../../auth/models/sign-in.dto';

export const signIn = createAction(
  '[Sign In] Auth',
  props<{
    credentials: SignInDto;
  }>()
);

export const signedIn = createAction(
  '[SignedIn]  Auth',
  props<{ payload: any }>()
);

export const loadSpinner = createAction(
  '[Load Spinner] Auth',
  props<{ isLoaded: boolean }>()
);

export const loadAuthException = createAction('[Load Exception] Auth');
