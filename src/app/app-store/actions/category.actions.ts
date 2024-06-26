import { createAction, props } from '@ngrx/store';
import { Category } from '../../store/models/domain/category';

export const createCategory = createAction(
  '[Create Category] Category',
  props<{ category: Category }>()
);

export const getCategory = createAction(
  '[Get Category] Category',
  props<{ id: string }>()
);

export const loadSpinner = createAction(
  '[Load Spinner] Category',
  props<{ isLoaded: boolean }>()
);

export const getCategories = createAction('[Get Categories] Category');

export const loadCategoryException = createAction('[Load Sale] Sale');

export const categoriesLoaded = createAction(
  '[Categories Loaded] Category',
  props<{ payload: Category[] }>()
);
export const categoryLoaded = createAction(
  '[Category Loaded] Sale',
  props<{ payload: Category }>()
);
