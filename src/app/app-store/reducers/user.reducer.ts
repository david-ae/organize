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
  currentUser: User | undefined;
  users: User[];
}

export const initialUserState: UserState = {
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

export const userFeature = createFeature({
  name: userFeatureState.name,
  reducer: createReducer(
    initialUserState,
    on(userActions.userLoaded, (state, action) => {
      return {
        ...state,
        store: action.payload,
      };
    })
  ),
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectCurrentUser,
  selectUsers,
} = userFeature;
