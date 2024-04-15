import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../../store/models/domain/user';
import * as userActions from './../actions/user.actions';

export interface UserState {
  isLoading: boolean;
  currentUser: User | undefined;
  users: User[];
}

export const initialUserState: UserState = {
  isLoading: false,
  currentUser: undefined,
  users: [],
};

const userFeatureState = createFeatureSelector<UserState>('user');

export const getUserDetails = createSelector(
  userFeatureState,
  (state) => state.currentUser
);

export const getStoreInventory = createSelector(
  userFeatureState,
  (state) => state.currentUser
);

export const getAllUsers = createSelector(
  userFeatureState,
  (state) => state.users
);

export const getUserisLoadingState = createSelector(
  userFeatureState,
  (state) => state.isLoading
);

export const userFeature = createFeature({
  name: userFeatureState.name,
  reducer: createReducer(
    initialUserState,
    on(userActions.userLoaded, (state, action) => {
      return {
        ...state,
        isLoading: false,
        store: action.payload,
      };
    }),
    on(userActions.loadSpinner, (state, action) => {
      return {
        ...state,
        isLoading: action.isLoaded,
      };
    })
  ),
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectCurrentUser,
  selectUsers,
  selectIsLoading,
} = userFeature;
