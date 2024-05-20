import { UserDto } from '../../store/models/valueobjects/user.dto';
import { StoreDto } from './../../store/models/valueobjects/store.dto';
import { TokensDto } from './tokens.dto';
export interface SignInResponse {
  user: UserDto;
  store: StoreDto;
  tokens: TokensDto;
}
