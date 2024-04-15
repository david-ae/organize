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

  isLoading$!: Observable<boolean>;
  unsubscriber$ = new Subject<void>();

  constructor(private spinner: NgxSpinnerService) {}

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(
      select(getStoreIsLoadingState),
      takeUntil(this.unsubscriber$)
    );
    this.isLoading$.subscribe((loading) => {
      if (loading) this.spinner.show();
      else this.spinner.hide();
    });
  }
}
