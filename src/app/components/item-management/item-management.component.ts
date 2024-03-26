import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from '../dialogs/add-item/add-item.component';
import { Observable } from 'rxjs';
import { Item } from '../../store/models/domain/item';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    AddItemComponent,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css',
})
export class ItemManagementComponent implements OnInit {
  inventoryForm!: FormGroup;
  items$!: Observable<Item[]>;

  constructor() {}

  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      searchInventory: new FormControl(''),
    });
  }

  onChange(event: any) {}
}
