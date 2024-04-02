import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { User } from '../models/domain/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTabsModule, CommonModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  cartService = inject(CartService);

  userForm!: FormGroup;

  users$!: Observable<User[]>;

  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      searchUsers: new FormControl(''),
    });
  }

  onChange(event: any) {}
}
