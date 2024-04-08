import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';
import * as storeActions from './../../app-store/actions/store.actions';
import { AppState } from '../../app.state';
import { Store as Bank } from './../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Item } from '../models/domain/item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  cartService = inject(CartService);

  store$!: Observable<Bank>;
  inventories!: Item[];

  unsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscribe$)
    );
    this.store$.subscribe((store) => (this.inventories = store.inventories));
  }

  spanishMessage() {}
}
