import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AppheaderComponent } from '../../components/appheader/appheader.component';

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
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    AppheaderComponent
  ],
  styleUrl: './shelf.component.css',
})
export class ShelfComponent {
  mode = 'side';
  opened = false;
  layoutGap = '64';
}
