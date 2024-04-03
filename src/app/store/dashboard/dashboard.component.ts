import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { MatButton } from '@angular/material/button';
import * as storeActions from './../../app-store/actions/store.actions';
import { Store as Bank } from './../models//domain//store';
import { AppState } from '../../app.state';
import { Item } from '../models/domain/item';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private store = inject(Store<AppState>);

  message$!: Observable<string>;

  constructor() {
    this.message$ = this.store.select('store');
  }
  ngOnInit(): void {
    this.store.dispatch(
      storeActions.loadStore({ id: '660441206767efafba73bc2e' })
    );
  }

  spanishMessage() {}
}
