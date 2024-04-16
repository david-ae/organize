import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { reducers, clearStateMetaReducer } from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { StoreEffects } from './app-store/effects/store.effects';
import { CategoryEffects } from './app-store/effects/category.effects';
import { UserEffects } from './app-store/effects/user.effects';
import { SaleEffects } from './app-store/effects/sale.effects';
import { CartService } from './store/services/cart.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr, ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({ timeOut: 1000, positionClass: 'toast-center-center' }),
    provideStore(reducers, { metaReducers: [clearStateMetaReducer] }),
    provideEffects([StoreEffects, CategoryEffects, UserEffects, SaleEffects]),
    CartService,
  ],
};
