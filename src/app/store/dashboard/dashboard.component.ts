import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';
import * as storeActions from './../../app-store/actions/store.actions';
import { AppState } from '../../app.state';
import { Store as Bank } from './../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Item } from '../models/domain/item';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../../components/dialogs/add-item/add-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { SaleComponent } from '../../components/sale/sale.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButton, MatGridListModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store<AppState>);
  cartService = inject(CartService);
  private router = inject(Router);

  store$!: Observable<Bank>;
  inventory: Item[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscribe$)
    );
    this.store$.subscribe((store) => (this.inventory = store.inventory));
  }

  navigate(route: string) {
    this.router.navigate([`/store/${route}`]);
  }

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {},
      panelClass: 'dialog',
    });
  }

  addSale() {
    let dialogRef = this.dialog.open(SaleComponent, {
      data: { inventories: this.inventory },
      width: '80%',
      panelClass: 'dialog',
    });
    dialogRef.afterOpened().subscribe((result) => {});
  }
}
