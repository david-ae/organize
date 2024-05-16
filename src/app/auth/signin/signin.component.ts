import { AppState } from './../../app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { BaseService } from '../../base.service';
import { Store } from '@ngrx/store';
import * as storeActions from './../../app-store/actions/store.actions';
import { AppUserDto } from '../../app-user.dto';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../store/services/cart.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';

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
  providers: [
    BaseService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit, OnDestroy {
  private baseService = inject(BaseService);
  private cartService = inject(CartService);
  store = inject(Store<AppState>);

  signinForm!: FormGroup;
  buttonText$ = new BehaviorSubject('Login');
  btnText$ = this.buttonText$.asObservable();
  buttonText = '';
  key = this.baseService.key;
  userDetails!: AppUserDto | null;

  unsubscribe$ = new Subject<void>();

  constructor(private toastrService: ToastrService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
    this.btnText$.subscribe((text) => (this.buttonText = text));
    const storeUser = this.baseService.getItemFromLocalStorage(
      this.key
    ) as string;
    this.userDetails = JSON.parse(storeUser);

    if (this.userDetails !== null) {
      this.buttonText = this.buttonText + ` as ${this.userDetails.email}`;
      this.buttonText$.next(this.buttonText);
    }
  }

  signin() {
    this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
    if (!this.userDetails) {
      const email = this.signinForm.get('email')?.value;
      this.getStoreAndRedirect(email);
    } else this.getStoreAndRedirect(this.userDetails.email);
  }

  private getStoreAndRedirect(email: string) {
    this.store.dispatch(storeActions.loadStoreByEmail({ email: email }));
  }

  removeAccount() {
    this.baseService.removeItemFromLocalStorage(this.key);
    this.cartService.clearCart();
    this.userDetails = null;
    this.buttonText$.next('Login');
  }
}
