import { AppState } from './../../app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../../components/dialogs/add-item/add-item.component';
import { select, Store } from '@ngrx/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Store as Bank } from './../models/domain/store';
import { Item } from '../models/domain/item';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);

  inventoryForm!: FormGroup;
  store$!: Observable<Bank>;
  inventories:Item[] = [];

  customerStore!: Bank;

  unsubscribe$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      searchInventory: new FormControl(''),
    });

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscribe$)
    );

    this.store$.subscribe((store) => (this.inventories = store.inventories));
  }

  onChange(event: any) {}

  addItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: { categories: this.customerStore.categories },
      panelClass: 'dialog',
    });
  }
}
