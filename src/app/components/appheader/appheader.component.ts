import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartService } from '../../store/services/cart.service';
import { map } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { UtilitiesService } from '../../store/services/utilities.service';

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.css',
})
export class AppheaderComponent implements OnInit {
  @Input() sideNav!: MatSidenav;
  utilitiesService = inject(UtilitiesService);

  cartService = inject(CartService);
  numberOfItems: number = 0;

  ngOnInit(): void {
    this.cartService.cart$.pipe(
      map((cart) => {
        if (cart) {
          this.numberOfItems = cart.getNumberOfItems();
        }
      })
    );
  }

  toggleNav() {
    const button = this.sideNav as MatSidenav;
    console.log(button);
    button.toggle();
  }
}
