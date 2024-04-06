import { AppState } from './../../app.state';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { SaleComponent } from '../../components/sale/sale.component';
import { Observable } from 'rxjs';
import { Sale } from '../models/domain/sale';
import { getSales } from '../../app-store/reducers/sale.reducer';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  store = inject(Store<AppState>);
  salesForm!: FormGroup;

  store$!: Observable<Sale[]>;
  sales: Sale[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.salesForm = new FormGroup({
      searchSales: new FormControl(''),
    });

    this.store$ = this.store.pipe(select(getSales));
    this.store$.subscribe(sales => this.sales = sales);
  }

  onChange(event: any) {}

  addSale() {
    const dialogRef = this.dialog.open(SaleComponent, { data: '' });
  }
}
