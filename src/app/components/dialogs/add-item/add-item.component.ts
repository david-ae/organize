import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../store/services/store.service';
import { MatButtonModule } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getStoreDetails } from '../../../app-store/reducers/store.reducer';
import { Store as Bank } from './../../../store/models/domain/store';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NumberRestrictionDirective } from '../../../directives/number-restriction.directive';
import { Item } from '../../../store/models/domain/item';
import * as storeActions from './../../../app-store/actions/store.actions';
@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  storeServcie = inject(StoreService);

  itemForm!: FormGroup;
  store$!: Observable<Bank>;
  categories: string[] = [];
  currentStore!: Bank;

  unsubscriber$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddItemComponent>
  ) {}

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemPrice: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl('', [Validators.required]),
      itemCategory: new FormControl('', [Validators.required]),
    });

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscriber$)
    );
    this.store$.subscribe((store) => {
      this.categories = store.categories;
      this.currentStore = store;
    });
  }

  addItem() {
    const itemName = this.itemForm.get('itemName')?.value;
    const itemPrice = this.itemForm.get('itemPrice')?.value;
    const itemQuantity = parseInt(this.itemForm.get('itemQuantity')?.value);
    const itemCategory = this.itemForm.get('itemCategory')?.value;

    const item: Item = {
      category: itemCategory,
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
    };
    this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      storeActions.addItemToStoreInventory({
        id: this.currentStore.id as string,
        item: item,
      })
    );

    this.dialog.close();
  }
}
