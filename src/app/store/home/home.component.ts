import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AppheaderComponent } from '../../components/appheader/appheader.component';
import { CartService } from '../cart.service';
import { ItemManagementComponent } from '../../components/item-management/item-management.component';
import { CheckoutComponent } from '../checkout/checkout.component';

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
  ],
  providers: [CartService],
  styleUrl: './home.component.css',
})
export class HomeComponent {
  mode = 'side';
  opened = false;
  layoutGap = '64';
}
