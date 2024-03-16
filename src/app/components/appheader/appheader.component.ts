import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartService } from '../../store/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.css',
})
export class AppheaderComponent implements OnInit {
  cartService = inject(CartService);
  numberOfItems: number = 0;

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(map((cart) => cart.getNumberOfItems()))
      .subscribe((numberOfItems) => (this.numberOfItems = numberOfItems));
  }
}
