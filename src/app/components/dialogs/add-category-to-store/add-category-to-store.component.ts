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

@Component({
  selector: 'app-add-category-to-store',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './add-category-to-store.component.html',
  styleUrl: './add-category-to-store.component.css',
})
export class AddCategoryToStoreComponent {
  store = inject(Store<AppState>);

  inventories$ = new BehaviorSubject<Category[]>([]);

  categoryForm!: FormGroup;
  categories: Category[] = [];
  categories$!: Observable<Category[]>;

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

    this.categories$.subscribe((categories) => (this.categories = categories));
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
        this.inventories$.next(items);
      });
  }
}
