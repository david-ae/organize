import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './store.routes';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
  ],
})
export class StoreModule {}
