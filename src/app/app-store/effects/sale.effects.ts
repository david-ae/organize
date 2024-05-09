import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap, exhaustMap } from 'rxjs';
import { StoreService } from '../../store/services/store.service';
import * as saleActions from './../actions/sale.actions';
import * as storeActions from './../actions/store.actions';
import { SalesService } from '../../store/services/sales.service';
import { loadSaleException } from './../actions/sale.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SaleEffects {
  constructor(
    private actions$: Actions,
    private saleService: SalesService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  getSalesByGroupQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saleActions.getSalesByGroupQuery),
      mergeMap((action) =>
        this.saleService.getSalesByGroupQuery(action.storeId).pipe(
          map((sales) => saleActions.salesLoaded({ payload: sales })),
          catchError(() => {
            this.toastrService.error(
              'Unable to retrieve sales. Please try again'
            );
            return of(saleActions.loadSaleException());
          })
        )
      )
    )
  );

  createSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saleActions.createSales),
      exhaustMap((action) =>
        this.saleService.createSales(action.salesRequest).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          tap(() => this.toastrService.success('Sale(s) created successfully')),
          catchError(() => {
            this.toastrService.error(
              'Unable to create sale(s). Please try again'
            );
            return of(saleActions.loadSaleException());
          })
        )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          saleActions.salesCreated,
          saleActions.salesLoaded,
          saleActions.loadSaleException
        ),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
