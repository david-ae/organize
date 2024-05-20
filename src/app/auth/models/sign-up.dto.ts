import { Store } from '../../store/models/domain/store';

export interface SignUpDto {
  store: Store;
  storeOwner: StoreOwner;
}

interface StoreOwner {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
