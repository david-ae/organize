import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import { LoadStoreResponse, SignInResponse } from '../../auth/models/sign-in-response.dto';

export interface AuthState {
  isLoading: boolean;
  signInResponse: SignInResponse | undefined;
  loadStoreResponse: LoadStoreResponse | undefined;
}

export const initialAuthState: AuthState = {
  isLoading: false,
  signInResponse: undefined,
  loadStoreResponse: undefined
};

const authFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthResponse = createSelector(
  authFeatureState,
  (state) => state.signInResponse
);

export const getLoadStoreResponse = createSelector(
  authFeatureState,
  (state) => state.loadStoreResponse
);

export const getAuthIsLoadingState = createSelector(
  authFeatureState,
  (state) => state.isLoading
);

export const authFeature = createFeature({
  name: authFeatureState.name,
  reducer: createReducer(
    initialAuthState,
    on(authActions.signUp, (state, action) => {
      return {
        ...state,
        isLoading: false,
        signInResponse: action.payload,
      };
    }),
    on(authActions.loadSpinner, (state, action) => {
      return {
        ...state,
        isLoading: action.isLoaded,
      };
    })
    // on(authActions.signIn, (state, action) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     response: action.payload
    //   };
    // }),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectSignInResponse,
  selectIsLoading,
} = authFeature;
