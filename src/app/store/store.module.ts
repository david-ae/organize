import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './store.routes';
import { CartService } from './cart.service';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { appReducer } from '../app-store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from '../app-store/effects/item.effects';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    NgrxStoreModule.forRoot({ store: appReducer }),
    EffectsModule.forRoot([ItemEffects]),
  ],
  providers: [CartService],
})
export class StoreModule {}
