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
import { Observable } from 'rxjs';
import { Store as Bank } from '../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { NumberRestrictionDirective } from '../../directives/number-restriction.directive';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    RouterModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent implements OnInit {
  store = inject(Store<AppState>);
  userForm!: FormGroup;
  storeForm!: FormGroup;

  newStore$!: Observable<Bank>;

  ngOnInit(): void {
    this.storeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        this.customEmailValidator,
      ]),
      address: new FormControl(''),
      storePhonenumber: new FormControl(''),
    });

    this.newStore$ = this.store.pipe(select(getStoreDetails));
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
    // this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));

    const name = this.storeForm.get('name')?.value as string;
    const storeEmail = this.storeForm.get('email')?.value as string;
    const address = this.storeForm.get('address')?.value as string;
    const storePhonenumber = this.storeForm.get('storePhonenumber')
      ?.value as string;
    this.store.dispatch(
      storeActions.createStore({
        store: {
          name: name,
          email: storeEmail,
          phoneNumber: storePhonenumber,
          address: address,
          categories: [],
          inventory: [],
        },
      })
    );
  }
}
