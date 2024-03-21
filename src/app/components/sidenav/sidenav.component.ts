import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatListModule, MatExpansionModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements AfterViewInit {
  @Output() sideNavId = new EventEmitter<MatSidenav>();

  @ViewChild('sideNav') sideNav!: MatSidenav;

  constructor() {}

  ngAfterViewInit(): void {
    this.sideNavId.emit(this.sideNav);
  }
}
