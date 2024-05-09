import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { StoreService } from '../../../store/services/store.service';
import { Store as Bank } from './../../../store/models/domain/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getStoreDetails } from '../../../app-store/reducers/store.reducer';
import { Item } from '../../../store/models/domain/item';
import { MatButtonModule } from '@angular/material/button';
import * as storeActions from './../../../app-store/actions/store.actions';
import { UpdateStoreInventoryDto } from '../../../store/models/valueobjects/store.dto';
import { Category } from '../../../store/models/domain/category';
import { getCategories } from '../../../app-store/reducers/category.reducer';
import { MatTabsModule } from '@angular/material/tabs';
import { ItemUpdate } from '../../../app-store/enum/item-update.enum';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
  ],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css',
})
export class UpdateItemComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  storeServcie = inject(StoreService);

  updateItemForm!: FormGroup;
  restockItemForm!: FormGroup;
  store$!: Observable<Bank>;
  categories: string[] = [];
  categories$!: Observable<Category[]>;
  currentStore!: Bank;

  currentItem!: Item;

  unsubscriber$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<UpdateItemComponent>
  ) {}

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.updateItemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemCategory: new FormControl('', [Validators.required]),
    });

    this.restockItemForm = new FormGroup({
      itemPrice: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl('', [Validators.required]),
    });

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscriber$)
    );
    this.store$.subscribe((store) => {
      this.currentStore = store;
    });

    this.categories$ = this.store.pipe(
      select(getCategories),
      takeUntil(this.unsubscriber$)
    );

    this.categories$.subscribe((categories) => {
      categories.map((c) => this.categories.push(c.name));
    });

    this.currentItem = this.currentStore.inventory.find(
      (i) => i.id == this.data.id
    ) as Item;

    this.updateItemForm.setValue({
      itemName: this.currentItem.name,
      itemCategory: this.currentItem.category,
    });
    this.restockItemForm.setValue({
      itemPrice: this.currentItem.price,
      itemQuantity: this.currentItem.quantity,
    });
  }

  updateItem() {
    const itemName = this.updateItemForm.get('itemName')?.value;
    const itemCategory = this.updateItemForm.get('itemCategory')?.value;

    const item: Item = {
      category: itemCategory,
      name: itemName,
      price: this.currentItem.price,
      quantity: this.currentItem.quantity,
    };

    const inventory = this.currentStore.inventory.map((i) =>
      i.id == this.currentItem.id ? Object.assign({}, i, item) : i
    );

    let storeInventory: UpdateStoreInventoryDto = {
      inventories: inventory,
    };
    this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      storeActions.updateStoreInventory({
        id: this.currentStore.id as string,
        store: storeInventory,
        updateType: ItemUpdate.UpdateItem,
      })
    );

    this.dialog.close();
  }

  restockItem() {
    const itemPrice = this.restockItemForm.get('itemPrice')?.value;
    const itemQuantity = this.restockItemForm.get('itemQuantity')?.value;

    const item: Item = {
      category: this.currentItem.category,
      name: this.currentItem.name,
      price: itemPrice,
      quantity: itemQuantity,
    };

    const inventory = this.currentStore.inventory.map((i) =>
      i.id == this.currentItem.id ? Object.assign({}, i, item) : i
    );

    let storeInventory: UpdateStoreInventoryDto = {
      inventories: inventory,
    };
    this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      storeActions.updateStoreInventory({
        id: this.currentStore.id as string,
        store: storeInventory,
        updateType: ItemUpdate.RestockItem,
      })
    );

    this.dialog.close();
  }
}
