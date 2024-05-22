import { AppState } from './../../app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { BaseService } from '../../base.service';
import { select, Store } from '@ngrx/store';
import * as storeActions from './../../app-store/actions/store.actions';
import { AppUserDto } from '../../app-user.dto';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as authActions from '../../app-store/actions/auth.actions';
import * as userActions from '../../app-store/actions/user.actions';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../store/services/cart.service';
import {
  LoadStoreResponse,
  SignInResponse,
} from '../models/sign-in-response.dto';
import {
  getAuthResponse,
  getLoadStoreResponse,
} from '../../app-store/reducers/auth.reducer';
import { User } from '../../store/models/domain/user';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    NgxSpinnerModule,
    CommonModule,
    FooterComponent,
  ],
  providers: [BaseService, AuthService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit, OnDestroy {
  private baseService = inject(BaseService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  store = inject(Store<AppState>);

  signinForm!: FormGroup;
  buttonText$ = new BehaviorSubject('Login');
  btnText$ = this.buttonText$.asObservable();
  buttonText = '';
  currentStoreUser!: User;
  userDetails!: User | null;
  signedIn$!: Observable<SignInResponse | undefined>;
  loadedStore$!: Observable<LoadStoreResponse | undefined>;

  unsubscribe$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.btnText$.subscribe((text) => (this.buttonText = text));
    const storeUser = this.baseService.getItemFromLocalStorage(
      this.authService.store_user
    );
    if (storeUser !== 'undefined') {
      this.userDetails = JSON.parse(storeUser);
      if (this.userDetails !== null) {
        this.buttonText = this.buttonText + ` as ${this.userDetails.email}`;
        this.buttonText$.next(this.buttonText);
      }
    }
    this.signedIn$ = this.store.pipe(select(getAuthResponse));
    this.loadedStore$ = this.store.pipe(select(getLoadStoreResponse));
  }

  signin() {
    this.store.dispatch(authActions.loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      authActions.signIn({
        credentials: {
          email: this.signinForm.get('email')?.value,
          password: this.signinForm.get('password')?.value,
        },
      })
    );
    this.signInStoreUser();
  }

  signInStoreUser() {
    this.signedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response) {
        this.authService.user_id = response?.user.id;
        this.authService.saveToLocalStorage(
          this.authService.ACCESS_TOKEN,
          response?.tokens.access_token
        );
        this.authService.saveToLocalStorage(
          this.authService.REFRESH_TOKEN,
          response?.tokens.refresh_token
        );

        this.store.dispatch(
          storeActions.storeLoaded({ payload: response.store })
        );
        this.store.dispatch(
          userActions.userLoaded({
            payload: {
              id: response?.user.id,
              email: response?.user.email,
              storeId: response?.store.id,
              name: `${response?.user.firstName} ${response?.user.lastName}`,
            },
          })
        );

        this.router.navigate(['store/dashboard']);
      }
    });
  }

  getStoreByEmail() {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
      this.store.dispatch(
        authActions.loadStoreByEmail({
          email: this.userDetails?.email as string,
        })
      );
      this.loadStore();
    } else this.removeAccount();
  }

  loadStore() {
    this.loadedStore$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log(response);
        if (response) {
          this.authService.user_id = response?.user.id as string;
          this.store.dispatch(
            storeActions.storeLoaded({ payload: response?.store })
          );
          this.store.dispatch(
            userActions.userLoaded({
              payload: {
                id: response?.user.id,
                email: response?.user.email,
                storeId: response?.store.id,
                name: `${response?.user.firstName} ${response?.user.lastName}`,
              },
            })
          );
          this.router.navigate(['store/dashboard']);
        }
      });
  }

  removeAccount() {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(
        authActions.logout({ payload: this.authService.user_id as string })
      );
    }

    this.baseService.removeItemFromLocalStorage(this.authService.ACCESS_TOKEN);
    this.cartService.clearCart();
    this.userDetails = null;
    this.buttonText$.next('Login');
  }
}
