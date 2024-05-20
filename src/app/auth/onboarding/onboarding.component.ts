import { AppState } from '../../app.state';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { select, Store } from '@ngrx/store';
import * as storeActions from '../../app-store/actions/store.actions';
import * as authActions from '../../app-store/actions/auth.actions';
import { map, Observable, tap } from 'rxjs';
import { Store as Bank } from '../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { NumberRestrictionDirective } from '../../directives/number-restriction.directive';
import { Router, RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignInResponse } from '../models/sign-up-response.dto';
import { getAuthResponse } from '../../app-store/reducers/auth.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    RouterModule,
    MatInputModule,
    LoadingSpinnerComponent,
    MatFormFieldModule,
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent implements OnInit {
  store = inject(Store<AppState>);
  userForm!: FormGroup;
  storeForm!: FormGroup;

  newStore$!: Observable<Bank>;
  signedIn$!: Observable<SignInResponse | undefined>;

  isLinear = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.storeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl(''),
    });
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        this.customEmailValidator,
      ]),
      userPhonenumber: new FormControl(''),
      password: new FormControl('', [Validators.required]),
    });

    this.newStore$ = this.store.pipe(select(getStoreDetails));
    this.signedIn$ = this.store.pipe(select(getAuthResponse));
  }

  getError(control: any): string {
    if (control.errors?.emailError && control.touched) {
      return 'Please enter a valid email address';
    } else return '';
  }

  customEmailValidator(control: AbstractControl) {
    const pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g;
    const value = control.value;
    if (!pattern.test(value) && control.touched) {
      return {
        emailError: true,
      };
    } else return null;
  }

  customRequiredValidator(control: AbstractControl) {
    const value = control.value;
    if (value === '' && control.touched) {
      return {
        requiredError: true,
      };
    } else return null;
  }

  register() {
    this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
    const name = this.storeForm.get('name')?.value as string;
    const address = this.storeForm.get('address')?.value as string;
    const userEmail = this.userForm.get('email')?.value as string;
    const userPhonenumber = this.userForm.get('userPhonenumber')?.value;
    const firstname = this.userForm.get('firstName')?.value as string;
    const lastname = this.userForm.get('lastName')?.value as string;
    const password = this.userForm.get('password')?.value as string;

    this.store.dispatch(
      authActions.createStore({
        onboard: {
          store: {
            name: name,
            address: address,
            categories: [],
            inventory: [],
          },
          storeOwner: {
            email: userEmail,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: userPhonenumber,
            password: password,
          },
        },
      })
    );
  }

  back() {
    this.router.navigate(['/signin']);
  }
}
