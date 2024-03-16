import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CartService } from '../../store/cart.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatGridListModule, MatListModule, MatButtonModule, RouterModule],
  providers: [CartService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {}
