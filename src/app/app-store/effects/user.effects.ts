import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { UserService } from '../../store/services/user.service';
import * as userActions from './../actions/user.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUser),
      mergeMap((action) =>
        this.userService.getUser(action.id).pipe(
          map((user) => userActions.userLoaded({ payload: user })),
          catchError(() => of(userActions.loadUserException()))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((store) => userActions.userLoaded({ payload: store })),
          tap(() => this.toastrService.success('User Created')),
          catchError(() => {
            this.toastrService.error('User creation faild. Please try again');
            return of(userActions.loadUserException());
          })
        )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.userLoaded, userActions.loadUserException),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
