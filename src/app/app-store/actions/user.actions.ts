import { User } from './../../store/models/domain/user';
import { createAction, props } from '@ngrx/store';

export const LOGOUT = '[App] Logout';
export const logoutAction = createAction('[App] Logout');

export const createUser = createAction(
  '[User Create] User',
  props<{ user: User }>()
);

export const getUser = createAction('[User Get] User', props<{ id: string }>());

export const userLoaded = createAction(
  '[User Loaded] User',
  props<{ payload: User }>()
);

export const loadSpinner = createAction(
  '[Load Spinner] User',
  props<{ isLoaded: boolean }>()
);

export const loadUserException = createAction('[Load User] User');
