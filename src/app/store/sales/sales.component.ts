import { AppState } from './../../app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { SaleComponent } from '../../components/sale/sale.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Sale } from '../models/domain/sale';
import { getSales } from '../../app-store/reducers/sale.reducer';
import * as saleActions from './../../app-store/actions/sale.actions';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';
import { Store as Bank } from './../models/domain/store';
import { SaleFields } from '../models/enums/sales-fields.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SaleDto } from '../../app-store/models/sale.dto';
import { CommonModule } from '@angular/common';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    DatePickerComponent,
    PaginationComponent,
    NgxPaginationModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  salesForm!: FormGroup;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  saleStore$!: Observable<SaleDto[]>;
  store$!: Observable<Bank>;
  sales: SaleDto[] = [];
  storeId!: string;

  itemsPerPage = 10;
  currentPage = 1;

  fields = ['itemName', 'status', 'transactionDate'];

  categories: string[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.salesForm = new FormGroup({
      // searchSales: new FormControl(''),
      fields: new FormControl(''),
      dateFrom: new FormControl(''),
    });

    this.saleStore$ = this.store.pipe(
      select(getSales),
      takeUntil(this.unsubscribe$)
    );

    this.store$ = this.store.pipe(
      select(getStoreDetails),
      takeUntil(this.unsubscribe$)
    );

    this.store$.subscribe((store) => {
      this.categories = store.categories;
      this.storeId = store.id as string;
    });

    this.store.dispatch(
      saleActions.getSalesByGroupQuery({
        storeId: this.storeId as string,
      })
    );

    this.saleStore$.subscribe((sales) => {
      if (this.storeId) {
        this.sales = sales;
      }
    });
  }

  get paginateData() {
    this.currentPage--;
    const start = this.currentPage + this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.sales.slice(start, end);
  }

  onChange(event: any) {}

  addSale() {
    const dialogRef = this.dialog.open(SaleComponent, { data: '' });
  }

  changePage(event: any) {
    console.log(event);
  }
}
