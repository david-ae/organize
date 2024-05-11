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
  isLoading: boolean;
  categories: Category[];
}

export const initialCategoryStore: CategoryState = {
  isLoading: false,
  categories: [],
};

const categoryFeatureState = createFeatureSelector<CategoryState>('category');

export const getCategories = createSelector(
  categoryFeatureState,
  (state) => state.categories
);

export const getCategoryIsLoadingState = createSelector(
  categoryFeatureState,
  (state) => state.isLoading
);

export const categoryFeature = createFeature({
  name: categoryFeatureState.name,
  reducer: createReducer(
    initialCategoryStore,
    on(categoryAction.categoriesLoaded, (state, action) => {
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    }),
    on(categoryAction.categoryLoaded, (state, action) => {
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.payload],
      };
    }),
    on(categoryAction.loadSpinner, (state, action) => {
      return {
        ...state,
        isLoading: action.isLoaded,
      };
    })
  ),
});

export const {
  name: categoryFeatureKey,
  reducer: categoryReducer,
  selectCategories,
  selectIsLoading,
} = categoryFeature;
