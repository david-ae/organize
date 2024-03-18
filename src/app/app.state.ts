import { Store } from './store/models/domain/store';

export interface AppState {
  store: Store | null;
  sales: any[];
}

export const initialAppState: AppState = {
  store: null,
  sales: [],
};
