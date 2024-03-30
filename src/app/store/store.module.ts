import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './store.routes';
import { CartService } from './services/cart.service';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [],
  imports: [
    DashboardComponent,
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [CartService],
})
export class StoreModule {}
