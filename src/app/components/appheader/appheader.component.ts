import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CartService } from '../../store/services/cart.service';
import { map } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { UtilitiesService } from '../../store/services/utilities.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SellItemComponent } from '../dialogs/sell-item/sell-item.component';
import { SaleComponent } from '../sale/sale.component';

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.css',
})
export class AppheaderComponent implements OnInit {
  @Input() sideNav!: MatSidenav;
  utilitiesService = inject(UtilitiesService);

  constructor(public dialog: MatDialog) {}

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
    button.toggle();
  }

  addSale() {
    let dialogRef = this.dialog.open(SaleComponent, {
      data: { name: '' },
      panelClass: 'dialog',
    });
    dialogRef.afterOpened().subscribe((result) => {});
  }
}
