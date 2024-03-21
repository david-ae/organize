import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './store.routes';
import { CartService } from './services/cart.service';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { appReducer } from '../app-store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from '../app-store/effects/item.effects';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
    NgrxStoreModule.forRoot({ store: appReducer }),
    EffectsModule.forRoot([ItemEffects]),
  ],
  providers: [CartService],
})
export class StoreModule {}
