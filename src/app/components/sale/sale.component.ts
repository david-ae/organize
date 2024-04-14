import { AppState } from './../../app.state';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  of,
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  Observable,
  BehaviorSubject,
  tap,
  Subject,
  takeUntil,
} from 'rxjs';
import { Item } from '../../store/models/domain/item';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Store as Bank } from './../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { CartService } from '../../store/services/cart.service';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [MatButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
})
export class SaleComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  cartService = inject(CartService);

  inventories$ = new BehaviorSubject<Item[]>([]);
  cart$ = this.cartService.currentCart;

  saleForm!: FormGroup;
  inventories: Item[] = [];
  store$!: Observable<Bank>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  unsubscriber$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.saleForm = new FormGroup({
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
            ? of(this.inventories?.filter((s: Item) => s.name.includes(i)))
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
