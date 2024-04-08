import { AppState } from './../../app.state';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { select, Store } from '@ngrx/store';
import * as storeActions from './../../app-store/actions/store.actions';
import * as userActions from './../../app-store/actions/user.actions';
import { Observable } from 'rxjs';
import { Store as Bank } from './../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  store = inject(Store<AppState>);
  userForm!: FormGroup;
  storeForm!: FormGroup;

  newStore$!: Observable<Bank>;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      phonenumber: new FormControl(''),
    });
    this.storeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      storePhonenumber: new FormControl(''),
    });

    this.newStore$ = this.store.pipe(select(getStoreDetails));
  }

  register() {
    const firstname = this.userForm.get('firstname')?.value;
    const lastname = this.userForm.get('lastname')?.value;
    const userEmail = this.userForm.get('email')?.value;
    const userPhonenumber = this.userForm.get('phonenumber')?.value;

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
          inventories: [],
        },
      })
    );

    // this.newStore$.subscribe((newStore) => {
    //   console.log(newStore);
    //   if (newStore) {
    //     this.store.dispatch(
    //       userActions.createUser({
    //         user: {
    //           storeId: newStore.id,
    //           email: userEmail,
    //           name: `${firstname} ${lastname}`,
    //           phoneNumber: userPhonenumber,
    //         },
    //       })
    //     );
    //   }
    // });
  }
}
