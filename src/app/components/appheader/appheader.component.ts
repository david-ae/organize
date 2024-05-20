import { AppState } from './../../app.state';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../store/services/cart.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SaleComponent } from '../sale/sale.component';
import { select, Store } from '@ngrx/store';
import * as authActions from './../../app-store/actions/auth.actions';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Store as Bank } from './../../store/models/domain/store';
import { BaseService } from '../../base.service';
import { AppUserDto } from '../../app-user.dto';
import { Item } from '../../store/models/domain/item';
import { LogoutdialogComponent } from '../dialogs/logoutdialog/logoutdialog.component';
import { AuthService } from '../../auth/auth.service';
import { UserDto } from '../../store/models/valueobjects/user.dto';
import { getUserDetails } from '../../app-store/reducers/user.reducer';
import { User } from '../../store/models/domain/user';
@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.css',
})
export class AppheaderComponent implements OnInit, OnDestroy {
  @Input() sideNav!: MatSidenav;

  private store = inject(Store<AppState>);
  private router = inject(Router);
  private baseService = inject(BaseService);
  protected cartService = inject(CartService);
  protected authService = inject(AuthService);

  store$!: Observable<Bank>;
  user$!: Observable<User | undefined>;
  currentStoreUser!: User;
  key = this.authService.ACCESS_TOKEN;
  store_user = this.authService.store_user;
  inventory: Item[] = [];

  unsubriber$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.unsubriber$.next();
    this.unsubriber$.complete();
  }

  numberOfItems: number = 0;

  ngOnInit(): void {
    this.cartService.currentCart.subscribe((cart) => {
      if (cart) {
        this.numberOfItems = cart.getNumberOfItems();
      } else this.numberOfItems = 0;
    });
    this.store$ = this.store.pipe(select(getStoreDetails));
    this.user$ = this.store.pipe(select(getUserDetails));
    this.store$.subscribe((store) => {
      // this.currentStoreUser = { email: store.email, id: store.id as string };
      this.inventory = store.inventory;
    });

    this.user$
      .pipe(takeUntil(this.unsubriber$))
      .subscribe((user) => (this.currentStoreUser = user as User));
  }

  toggleNav() {
    const button = this.sideNav as MatSidenav;
    button.toggle();
  }

  addSale() {
    let dialogRef = this.dialog.open(SaleComponent, {
      data: { inventories: this.inventory },
      width: '80%',
      panelClass: 'dialog',
    });
    dialogRef.afterOpened().subscribe((result) => {});
  }

  logout() {
    this.dialog
      .open(LogoutdialogComponent, {})
      .afterClosed()
      .subscribe((result) => {
        if (result === 'confirm') {
          this.processLogout();
        }
      });
  }

  processLogout() {
    this.store.dispatch(
      authActions.logout({ payload: this.currentStoreUser.id as string })
    );
    this.router.navigate(['/signin']);
    this.handleLocalStorageOnLogout();
  }

  private handleLocalStorageOnLogout() {
    this.baseService.removeItemFromLocalStorage(this.key);
    this.baseService.saveToLocalStorage(
      this.store_user,
      JSON.stringify(this.currentStoreUser)
    );
  }
}
