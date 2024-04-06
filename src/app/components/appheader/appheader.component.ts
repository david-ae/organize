import { AppState } from './../../app.state';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../store/services/cart.service';
import { map, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { UtilitiesService } from '../../store/services/utilities.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SaleComponent } from '../sale/sale.component';
import { select, Store } from '@ngrx/store';
import * as userActions from './../../app-store/actions/user.actions';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Store as Bank } from './../../store/models/domain/store';
import { BaseService } from '../../base.service';
import { AppUserDto } from '../../app-user.dto';
import { Item } from '../../store/models/domain/item';
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
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private baseService = inject(BaseService);

  store$!: Observable<Bank>;
  currentStoreUser!: AppUserDto;
  key = this.baseService.key;
  inventories: Item[] = [];

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
    this.store$ = this.store.pipe(select(getStoreDetails));
    this.store$.subscribe(
      (store) =>{
        (this.currentStoreUser = { email: store.email, id: store.id as string })
        this.inventories = store.inventories;
      }
    );
  }

  toggleNav() {
    const button = this.sideNav as MatSidenav;
    button.toggle();
  }

  addSale() {
    let dialogRef = this.dialog.open(SaleComponent, {
      data: { inventories: this.inventories },
      panelClass: 'dialog',
    });
    dialogRef.afterOpened().subscribe((result) => {});
  }

  logout() {
    if (
      this.currentStoreUser.id !== undefined ||
      this.currentStoreUser.email !== ''
    ) {
      this.handleLocalStorageOnLogout();
    }
    this.store.dispatch(userActions.logoutAction());
    this.router.navigate(['/signin']);
  }

  private handleLocalStorageOnLogout() {
    this.baseService.removeItemFromLocalStorage(this.key);
    this.baseService.saveToLocalStorage(
      this.key,
      JSON.stringify(this.currentStoreUser)
    );
  }
}
