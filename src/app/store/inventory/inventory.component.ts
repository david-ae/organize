import { AppState } from './../../app.state';
import { Component, inject, OnInit } from '@angular/core';
import { ItemManagementComponent } from '../../components/item-management/item-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { Store as Bank } from './../models/domain/store';
import { map, Observable } from 'rxjs';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ItemManagementComponent,
    MatTabsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  store = inject(Store<AppState>);
  items = [];

  storeDetails$!: Observable<Bank | undefined>;

  constructor() {}

  ngOnInit(): void {
    this.storeDetails$ = this.store.pipe(select(getStoreDetails));
    this.storeDetails$.subscribe((s) => console.log(s));
  }
}
