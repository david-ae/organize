import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CartService } from '../../store/cart.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../../store/services/store.service';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, ReactiveFormsModule, AddItemComponent, UpdateItemComponent],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css',
})
export class ItemManagementComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}
