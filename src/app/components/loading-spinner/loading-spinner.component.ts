import { AppState } from './../../app.state';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store as Bank } from './../../store/models/domain/store';
import { getStoreIsLoadingState } from '../../app-store/reducers/store.reducer';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  isLoaded = false;

  isLoading$!: Observable<boolean>;
  unsubscriber$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(
      select(getStoreIsLoadingState),
      takeUntil(this.unsubscriber$)
    );
    this.isLoading$.subscribe((loading) => (this.isLoaded = loading));
  }
}
