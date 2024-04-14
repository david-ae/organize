import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap, exhaustMap } from 'rxjs';
import { StoreService } from '../../store/services/store.service';
import * as saleActions from './../actions/sale.actions';
import { SalesService } from '../../store/services/sales.service';
import { loadSaleException } from './../actions/sale.actions';

@Injectable()
export class SaleEffects {
  constructor(private actions$: Actions, private saleService: SalesService) {}

  // createSale$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(saleActions.createSale),
  //     mergeMap((action) =>
  //       this.saleService.createSale(action.id, action.sale).pipe(
  //         map((sale) => saleActions.saleLoaded({ payload: sale })),
  //         catchError(() => of(loadSaleException()))
  //       )
  //     )
  //   )
  // );

  createSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saleActions.createSales),
      exhaustMap((action) =>
        this.saleService.createSales(action.sales).pipe(
          map(() => saleActions.salesCreated()),
          catchError(() => of(loadSaleException()))
        )
      )
    )
  );

  getSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saleActions.getSales),
      mergeMap((action) =>
        this.saleService.getSales(action.storeId).pipe(
          map((sales) => saleActions.salesLoaded({ payload: sales })),
          catchError(() => of(loadSaleException()))
        )
      )
    )
  );
}
