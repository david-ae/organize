import { Component, inject } from '@angular/core';
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
import { Observable } from 'rxjs';
import { getStoreDetails } from '../../../app-store/reducers/store.reducer';
import { Store as Bank } from './../../../store/models/domain/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  store = inject(Store<AppState>);
  storeServcie = inject(StoreService);

  itemForm!: FormGroup;
  store$!: Observable<Bank>;

  constructor() {}

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemPrice: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl(''),
      itemCategory: new FormControl('', [Validators.required]),
    });

    this.store$ = this.store.pipe(select(getStoreDetails));
  }

  addItem() {
    const itemName = this.itemForm.get('itemName')?.value;
    const itemPrice = this.itemForm.get('itemPrice')?.value;
    const itemQuantity = this.itemForm.get('itemQuantity')?.value;
    const itemCategory = this.itemForm.get('itemCategory')?.value;
  }
}
