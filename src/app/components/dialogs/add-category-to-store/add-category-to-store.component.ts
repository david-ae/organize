import { Component, inject, Inject } from '@angular/core';
import { AppState } from '../../../app.state';
import { select, Store } from '@ngrx/store';
import { Category } from '../../../store/models/domain/category';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  BehaviorSubject,
  Observable,
  Subject,
  takeUntil,
  of,
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';
import { getCategories } from '../../../app-store/reducers/category.reducer';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Store as Bank } from './../../../store/models/domain/store';
import { getStoreDetails } from '../../../app-store/reducers/store.reducer';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import * as categoryActions from './../../../app-store/actions/category.actions';
import * as storeActions from './../../../app-store/actions/store.actions';
export interface CategoryForUI {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-add-category-to-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './add-category-to-store.component.html',
  styleUrl: './add-category-to-store.component.css',
})
export class AddCategoryToStoreComponent {
  store = inject(Store<AppState>);

  filteredCategories$ = new BehaviorSubject<CategoryForUI[]>([]);

  categoryForm!: FormGroup;
  categories: Category[] = [];
  categories$!: Observable<Category[]>;
  store$!: Observable<Bank>;
  categoriesFromStore: string[] = [];
  categoriesAvaliable = false;
  currentStore!: Bank;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  unsubscriber$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      searchCategories: new FormControl(''),
    });
    this.categories$ = this.store.pipe(
      select(getCategories),
      takeUntil(this.unsubscriber$)
    );

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscriber$)
    );

    this.store$.subscribe((store) => {
      this.categoriesFromStore = store.categories;
      this.currentStore = store;
    });

    this.categories$.subscribe((categories) => {
      if (categories.length > 0) {
        this.categories = categories;
      }
    });
  }

  onChange(event: any) {
    const target = event.target;
    of(target)
      .pipe(
        map((i) => i.value),
        debounceTime(1000),
        distinctUntilChanged(),
        filter((item) => !!item),
        switchMap((i: string) =>
          i ? of(this.categories?.filter((s) => s.name.includes(i))) : of([])
        )
      )
      .subscribe((items) => {
        const setOfCategoriesFromStore = new Set(this.categoriesFromStore);
        const newCategories = items.filter(
          (x) => !setOfCategoriesFromStore.has(x.name)
        );
        this.filteredCategories$.next(this.FromCategory(newCategories));
      });
  }

  private FromCategory(categories: Category[]): CategoryForUI[] {
    let uiCategories = [];
    for (let category of categories) {
      const newCategory: CategoryForUI = {
        name: category.name,
        checked: false,
      };
      uiCategories.push(newCategory);
    }

    return uiCategories;
  }

  addCategoriesToStore(filteredCategories: CategoryForUI[]) {
    let categoriesToCreate: string[] = [];

    filteredCategories
      .filter((c) => c.checked === true)
      .map((category) => categoriesToCreate.push(category.name));

    if (categoriesToCreate.length > 0 && this.currentStore) {
      this.store.dispatch(storeActions.loadSpinner({ isLoaded: true }));
      this.store.dispatch(
        storeActions.addCategoriesToStore({
          id: this.currentStore.id as string,
          categories: categoriesToCreate,
        })
      );
    } else {
      //alert error
    }
  }
}
