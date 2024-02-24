import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [MatToolbarModule, RouterModule],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.css',
})
export class AppheaderComponent {}
