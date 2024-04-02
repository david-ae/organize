import { SaleState } from './app-store/reducers/sale.reducer';
import { StoreState } from './app-store/reducers/store.reducer';
import { UserState } from './app-store/reducers/user.reducer';

export interface AppState {
  store: StoreState;
  // user: UserState;
  sale: SaleState;
}
