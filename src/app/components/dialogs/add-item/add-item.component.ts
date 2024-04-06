import { Component, Inject, inject } from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberRestrictionDirective } from '../../../directives/number-restriction.directive';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    NumberRestrictionDirective,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  store = inject(Store<AppState>);
  storeServcie = inject(StoreService);

  itemForm!: FormGroup;
  store$!: Observable<Bank>;
  categories = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemPrice: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl('', [Validators.required]),
      itemCategory: new FormControl('', [Validators.required]),
    });

    this.store$ = this.store.pipe(select(getStoreDetails));
    this.categories = this.data.categories;
  }

  addItem() {
    const itemName = this.itemForm.get('itemName')?.value;
    const itemPrice = this.itemForm.get('itemPrice')?.value;
    const itemQuantity = parseInt(this.itemForm.get('itemQuantity')?.value);
    const itemCategory = this.itemForm.get('itemCategory')?.value;

    // console.log(itemName, itemPrice, itemCategory, itemQuantity);
  }
}
