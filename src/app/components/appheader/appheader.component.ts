import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartService } from '../../store/cart.service';

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.css',
})
export class AppheaderComponent implements OnInit {
  numberOfItems!: number;
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.numberOfItems = this._cartService.cartItems.length;
    this._cartService.addToCart({ name: 'das', price: 323 });
    // console.log(this._cartService.cartItems().push());
  }
}
