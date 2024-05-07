import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';
import {
  BehaviorSubject,
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
import { Item } from '../models/domain/item';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Store as Bank } from './../../store/models/domain/store';
import { AppState } from '../../app.state';
import { CartService } from '../services/cart.service';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit, OnDestroy {
  shopForm!: FormGroup;
  storeService = inject(StoreService);
  input!: HTMLElement;

  store = inject(Store<AppState>);
  cartService = inject(CartService);

  inventories$ = new BehaviorSubject<Item[]>([]);
  unsubscriber$ = new Subject<void>();
  cart$ = this.cartService.currentCart;

  saleForm!: FormGroup;
  inventories: Item[] = [];
  store$!: Observable<Bank>;

  items$ = new BehaviorSubject<Item[]>([]);

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.shopForm = new FormGroup({
      searchItems: new FormControl(''),
    });

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscriber$)
    );

    this.store$.subscribe((store) => (this.inventories = store.inventory));
  }

  onChange(event: any) {
    const target = event.target;
    of(target)
      .pipe(
        map((i) => i.value),
        debounceTime(1000),
        distinctUntilChanged(),
        filter((item) => !!item),
        switchMap((i: string) =>
          i
            ? of(
                this.inventories?.filter((s: Item) =>
                  s.name.toLowerCase().includes(i.toLowerCase())
                )
              )
            : of([])
        )
      )
      .subscribe((items) => {
        this.inventories$.next(items);
      });
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }
}
