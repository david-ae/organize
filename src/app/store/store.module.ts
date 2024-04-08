import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './store.routes';
import { CartService } from './services/cart.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppheaderComponent } from '../components/appheader/appheader.component';
import { SaleComponent } from '../components/sale/sale.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
    HomeComponent,
    AppheaderComponent,
    SaleComponent,
  ],
  providers: [CartService],
})
export class StoreModule {}
