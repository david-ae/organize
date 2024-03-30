import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { MatButton } from '@angular/material/button';
import * as storeActions from './../../app-store/actions/store.actions';
import { Store as Bank } from './../models//domain//store';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private store = inject(Store<AppState>);

  message$!: Observable<string>;

  constructor() {
    this.message$ = this.store.select('store');
  }

  spanishMessage() {
    const st: Bank = {
      email: 'david@yahoo.com',
      storename: 'Chinedu',
      phoneNumber: '09096232',
      inventory: [],
      categories: [],
      users: [],
    };
    this.store.dispatch(storeActions.createStore({ store: st }));
  }
}
