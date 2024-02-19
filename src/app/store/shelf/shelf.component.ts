import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    RouterModule,
    SearchComponent,
    MatSidenavModule,
    MatIconModule,
  ],
  styleUrl: './shelf.component.css',
})
export class ShelfComponent {
  mode = 'side';
  opened = false;
  layoutGap = '64';
}
