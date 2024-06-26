import { SaleState } from './../../app-store/reducers/sale.reducer';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { CartService } from '../services/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { Item } from '../models/domain/item';
import { CartItem } from '../models/cartItem';
import { select, Store } from '@ngrx/store';
import { CreateSale, Sale } from '../models/domain/sale';
import {
  getStoreDetails,
  StoreState,
} from '../../app-store/reducers/store.reducer';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Store as Bank } from './../models/domain/store';
import { Status } from '../models/enums/status.enum';
import * as saleActions from './../../app-store/actions/sale.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmrejectDialogComponent } from '../../components/dialogs/confirmreject-dialog/confirmreject-dialog.component';
import { CreateSalesDto } from '../models/valueobjects/sale.dto';
import { UpdateStoreInventoryDto } from '../models/valueobjects/store.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  saleStore = inject(Store<SaleState>);
  store = inject(Store<StoreState>);
  cartService = inject(CartService);

  cart$ = this.cartService.currentCart;
  total$ = new BehaviorSubject<number>(0);
  total = 0;
  store$!: Observable<Bank>;
  currentStore!: Bank;
  cart!: Cart;
  inventory: Item[] = [];

  cartForm!: FormGroup;

  unsubcriber$ = new Subject<void>();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubcriber$.next();
    this.unsubcriber$.complete();
  }

  ngOnInit(): void {
    this.cartForm = new FormGroup({});
    this.cart$.subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        cart.calculateTotal(0);
        this.total = cart.getTotal();
      }
    });
    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubcriber$)
    );
    this.total$.next(this.total);
    this.store$.subscribe((store) => {
      this.currentStore = store;
      this.inventory = store.inventory;
    });
  }

  openConfirmDialog() {
    let dialogRef = this.dialog.open(ConfirmrejectDialogComponent);
    dialogRef.addPanelClass('dialog');
    let checkoutDialog = dialogRef.componentInstance;
    checkoutDialog.title = 'Checkout';
    checkoutDialog.message = `Are you sure you want to proceed with the #${this.cart.getTotal()} sale?`;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.addSale();
      }
    });
  }

  incrementQuantity(id: string | undefined) {
    if (this.cart) {
      for (let cartItem of this.cart.cartItems) {
        if (cartItem.item.id === id) {
          const qty = cartItem.getQuantity() + 1;
          if (cartItem.getItem().quantity >= qty) {
            this.cart.update(cartItem.item, qty.toString());
            this.cart.calculateTotal(0);
            this.total$.next(this.cart.getTotal());
            this.cartService.cart$.next(this.cart);
          }
          break;
        }
      }
    }
  }

  decrementQuantity(id: string | undefined) {
    if (this.cart) {
      for (let cartItem of this.cart.cartItems) {
        if (cartItem.item.id === id) {
          const qty = cartItem.getQuantity() - 1;
          this.cart.update(cartItem.item, qty.toString());
          this.cart.calculateTotal(0);
          this.total$.next(this.cart.getTotal());
          this.cartService.cart$.next(this.cart);
          break;
        }
      }
    }
  }

  removeItem(item: Item) {
    if (this.cart) {
      this.cart.removeItem(item);
      this.cartService.cart$.next(this.cart);
      this.total$.next(0);
    }
  }

  clearCart() {
    this.cartService.clearCart();
  }

  onChange(item: CartItem) {}

  addSale() {
    // this.store.dispatch(saleActions.loadSpinner({ isLoaded: true }));
    let sales: Sale[] = [];
    this.cart.cartItems.map((item) => {
      let count = item.getQuantity();
      this.updateInventory(item, count);
      while (count > 0) {
        const newSale: CreateSale = {
          storeId: this.currentStore.id as string,
          actualAmount: item.getItem().price,
          expectedAmount: item.getItem().price,
          itemId: item.getItem().id as string,
          status: Status.Completed,
          itemName: item.getItem().name,
        };
        sales.push(newSale);
        count--;
      }
    });

    let storeInventory: UpdateStoreInventoryDto = {
      inventories: this.inventory,
    };

    const saleRequest: CreateSalesDto = {
      storeId: this.currentStore.id as string,
      inventory: storeInventory,
      sales: sales,
    };

    this.store.dispatch(saleActions.loadSpinner({ isLoaded: true }));
    this.store.dispatch(saleActions.createSales({ salesRequest: saleRequest }));
    this.clearCart();

    this.router.navigate(['/store/shop']);
  }

  private updateInventory(cartItem: CartItem, quantity: number) {
    const item: Item = {
      category: cartItem.getItem().category,
      name: cartItem.getItem().name,
      price: cartItem.getItem().price,
      quantity: cartItem.getItem().quantity - quantity,
    };

    this.inventory = this.inventory.map((i) =>
      i.id == cartItem.getItem().id ? Object.assign({}, i, item) : i
    );
  }
}
