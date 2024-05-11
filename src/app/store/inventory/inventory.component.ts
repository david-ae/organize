import { AppState } from './../../app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../../components/dialogs/add-item/add-item.component';
import { select, Store } from '@ngrx/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Store as Bank } from './../models/domain/store';
import { Item } from '../models/domain/item';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateItemComponent } from '../../components/dialogs/update-item/update-item.component';
import * as storeActions from './../../app-store/actions/store.actions';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);

  inventoryForm!: FormGroup;
  store$!: Observable<Bank>;
  inventory: Item[] = [];
  inventories$!: Observable<Item[]>;

  customerStore!: Bank;

  unsubscribe$ = new Subject<void>();

  p: number = 1;

  constructor(public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      searchInventory: new FormControl(''),
    });

    this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscribe$)
    );

    this.store$.subscribe((store) => (this.inventory = store.inventory));
  }

  onChange(event: any) {}

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {},
      panelClass: 'dialog',
    });
  }

  edit(id: string | undefined) {
    const dialogRef = this.dialog.open(UpdateItemComponent, {
      data: { id: id },
      panelClass: 'dialog',
    });
  }
}
