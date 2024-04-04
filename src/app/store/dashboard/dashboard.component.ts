import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';
import * as storeActions from './../../app-store/actions/store.actions';
import { AppState } from '../../app.state';
import { Store as Bank } from './../../store/models/domain/store';
import { getStoreDetails } from '../../app-store/reducers/store.reducer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private store = inject(Store<AppState>);

  store$!: Observable<Bank>;

  constructor() {}
  ngOnInit(): void {
    this.store$ = this.store.pipe(select(getStoreDetails));
    this.store$.subscribe((s) => console.log(s));
  }

  spanishMessage() {}
}
