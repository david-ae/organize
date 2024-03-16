import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './store.routes';
import { CartService } from './cart.service';
import { ItemManagementComponent } from '../components/item-management/item-management.component';
import { AppheaderComponent } from '../components/appheader/appheader.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
  ],
  providers: [CartService],
})
export class StoreModule {}
