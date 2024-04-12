import { Injectable } from '@angular/core';
import * as categoryActions from './../../app-store/actions/category.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { loadSaleException } from '../actions/sale.actions';
import { CategoriesService } from '../../store/services/categories.service';
import * as storeActions from './../../app-store/actions/store.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService
  ) {}

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.createCategory),
      mergeMap((action) =>
        this.categoryService.createCategory(action.category).pipe(
          map((category) =>
            categoryActions.categoryLoaded({ payload: category })
          ),
          catchError(() => of(loadSaleException()))
        )
      )
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.getCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) =>
            categoryActions.categoriesLoaded({ payload: categories })
          ),
          catchError(() => of(loadSaleException()))
        )
      )
    )
  );

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.getCategory),
      mergeMap((action) =>
        this.categoryService.getCategory(action.id).pipe(
          map((category) =>
            categoryActions.categoryLoaded({ payload: category })
          ),
          catchError(() => of(loadSaleException()))
        )
      )
    )
  );
}
