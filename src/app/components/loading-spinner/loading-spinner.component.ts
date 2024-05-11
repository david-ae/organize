import { AppState } from './../../app.state';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getStoreIsLoadingState } from '../../app-store/reducers/store.reducer';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { getSaleIsLoadingState } from '../../app-store/reducers/sale.reducer';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  isLoaded = false;

  isLoadingStore$!: Observable<boolean>;
  isLoadingSale$!: Observable<boolean>;
  unsubscriber$ = new Subject<void>();

  constructor(private spinner: NgxSpinnerService) {}

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.isLoadingStore$ = this.store.pipe(
      select(getStoreIsLoadingState),
      takeUntil(this.unsubscriber$)
    );

    this.isLoadingSale$ = this.store.pipe(
      select(getSaleIsLoadingState),
      takeUntil(this.unsubscriber$)
    );

    this.isLoadingStore$.subscribe((loading) => {
      if (loading) this.spinner.show();
      else this.spinner.hide();
    });

    this.isLoadingSale$.subscribe((loading) => {
      if (loading) this.spinner.show();
      else this.spinner.hide();
    });
  }
}
