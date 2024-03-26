import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AppheaderComponent } from '../../components/appheader/appheader.component';
import { CartService } from '../services/cart.service';
import { ItemManagementComponent } from '../../components/item-management/item-management.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    AppheaderComponent,
    ItemManagementComponent,
    CheckoutComponent,
    SidenavComponent,
    MatSidenavModule,
  ],
  providers: [CartService, MatSidenavContainer],
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterContentChecked {
  mode = 'side';
  opened = false;
  layoutGap = '64';

  utilitiesService = inject(UtilitiesService);

  sideNav!: MatSidenav;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  onMatSideNav(event: MatSidenav) {
    this.sideNav = event;
  }
}
