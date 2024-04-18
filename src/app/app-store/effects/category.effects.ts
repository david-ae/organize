import { Injectable } from '@angular/core';
import * as categoryActions from './../../app-store/actions/category.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { CategoriesService } from '../../store/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as storeActions from './../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService,
    private spinnerService: NgxSpinnerService,
    private storeService: StoreService,
    private toasterService: ToastrService
  ) {}

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.createCategory),
      mergeMap((action) =>
        this.categoryService.createCategory(action.category).pipe(
          map((category) =>
            categoryActions.categoryLoaded({ payload: category })
          ),
          tap(() => this.toasterService.success('Category created')),
          catchError(() => {
            this.toasterService.error(
              'Create Category Failed. Please try again'
            );
            return of(categoryActions.loadCategoryException());
          })
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
          catchError(() => {
            this.toasterService.error(
              'Unable to retrieve Categories. Please try again'
            );
            return of(categoryActions.loadCategoryException());
          })
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
          catchError(() => {
            this.toasterService.error('Unable to retireve Category');
            return of(categoryActions.loadCategoryException());
          })
        )
      )
    )
  );

  addCategoriesToStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addCategoriesToStore),
      mergeMap((action) =>
        this.storeService
          .addCategoriesToStore(action.id, action.categories)
          .pipe(
            map((store) => storeActions.storeLoaded({ payload: store })),
            tap(() =>
              this.toasterService.success('Categories added to your store')
            ),
            catchError(() => {
              this.toasterService.error('Categories not added to your store');
              return of(storeActions.loadStoreException());
            })
          )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          categoryActions.categoryLoaded,
          categoryActions.loadCategoryException
        ),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
