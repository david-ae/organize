import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Category } from '../../store/models/domain/category';
import * as categoryAction from './../actions/category.actions';

export interface CategoryState {
  categories: Category[];
}

export const initialCategoryStore: CategoryState = {
  categories: [],
};

const categoryFeatureState = createFeatureSelector<CategoryState>('category');

export const getCategories = createSelector(
  categoryFeatureState,
  (state) => state.categories
);

export const categoryFeature = createFeature({
  name: categoryFeatureState.name,
  reducer: createReducer(
    initialCategoryStore,
    on(categoryAction.categoriesLoaded, (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    }),
    on(categoryAction.categoryLoaded, (state, action) => {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    })
  ),
});

export const {
  name: categoryFeatureKey,
  reducer: categoryReducer,
  selectCategories,
} = categoryFeature;
