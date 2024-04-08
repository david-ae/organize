import { Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { AddItemComponent } from '../../components/dialogs/add-item/add-item.component';
import { Store as Bank } from './../models/domain/store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../models/domain/category';
import { getCategories } from '../../app-store/reducers/category.reducer';
import { AddCategoryToStoreComponent } from '../../components/dialogs/add-category-to-store/add-category-to-store.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  store = inject(Store<AppState>);

  categoryForm!: FormGroup;
  store$!: Observable<Bank>;
  category$!: Observable<Category[]>;
  categories: string[] = [];
  categriesFromStore: Category[] = [];

  customerStore!: Bank;

  unsubscribe$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      searchCategories: new FormControl(''),
    });

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscribe$)
    );
    this.category$ = this.store.pipe(
      select(getCategories),
      takeUntil(this.unsubscribe$)
    );

    this.store$.subscribe((store) => (this.categories = store.categories));
    this.category$.subscribe(
      (catgories) => (this.categriesFromStore = catgories)
    );
  }

  onChange(event: any) {}

  addItem() {
    const dialogRef = this.dialog.open(AddCategoryToStoreComponent, {
      data: {},
      panelClass: 'dialog',
    });
  }
}
