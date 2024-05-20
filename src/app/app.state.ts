import { AuthState } from './app-store/reducers/auth.reducer';
import { CategoryState } from './app-store/reducers/category.reducer';
import { SaleState } from './app-store/reducers/sale.reducer';
import { StoreState } from './app-store/reducers/store.reducer';
import { UserState } from './app-store/reducers/user.reducer';

export interface AppState {
  store: StoreState;
  category: CategoryState,
  user: UserState;
  sale: SaleState;
  auth: AuthState;
}
