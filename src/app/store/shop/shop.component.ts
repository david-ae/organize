import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Item } from '../models/domain/item';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  shopForm!: FormGroup;
  storeService = inject(StoreService);

  item$ = new BehaviorSubject<Item | undefined>(undefined);

  ngOnInit(): void {
    this.shopForm = new FormGroup({
      searchItems: new FormControl(''),
    });
  }
  onChange(event: any) {
    const target = event.target;

    of(target)
      .pipe(
        map((i) => i.value),
        debounceTime(1000),
        distinctUntilChanged(),
        filter((item) => !!item),
        switchMap((i) =>
          i
            ? from(this.storeService.getItems(i))
            : from(Promise.resolve(undefined))
        )
      )
      .subscribe((item) => {
        this.item$.next(item);
      });
  }
}
