import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../../store/services/store.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  storeServcie = inject(StoreService);

  itemForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemPrice: new FormControl('', [Validators.required]),
      itemQuantity: new FormControl(''),
      itemCategory: new FormControl('', [Validators.required]),
    });
  }

  addItem() {
    const itemName = this.itemForm.get('itemName')?.value;
    const itemPrice = this.itemForm.get('itemPrice')?.value;
    const itemQuantity = this.itemForm.get('itemQuantity')?.value;
    const itemCategory = this.itemForm.get('itemCategory')?.value;

    this.storeServcie.addItem({
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
      category: itemCategory,
    });
  }
}
