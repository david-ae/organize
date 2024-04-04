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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [BaseService, AuthService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit, OnDestroy {
  private baseService = inject(BaseService);
  private authService = inject(AuthService);
  private router = inject(Router);
  store = inject(Store<AppState>);

  signinForm!: FormGroup;
  buttonText = 'Login';
  key = this.baseService.key;
  userEmail = '';

  unsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
    const storeUserEmail = this.baseService.getItemFromLocalStorage(
      this.key
    ) as string;
    console.log(storeUserEmail);
    // if (storeUserEmail !== null) {
    //   this.userEmail = storeUserEmail;
    //   this.buttonText = this.buttonText + ` as ${storeUserEmail}`;
    // }
  }

  signin() {
    const email = this.signinForm.get('email')?.value;

    this.authService
      .getStoreByEmail(email)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((store) => {
        if (store) {
          this.store.dispatch(storeActions.storeLoaded({ payload: store }));
          this.router.navigate(['/store/dashboard']);
        }
      });
  }
}
