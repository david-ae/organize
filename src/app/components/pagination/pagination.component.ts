import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() itemPerPage: any;

  @Output() onClick: EventEmitter<number> = new EventEmitter();

  totalPages = 0;
  pages: number[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.totalItems) {
      this.totalPages = Math.ceil(this.totalItems / this.itemPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      console.log(this.pages);
    }
  }

  pageClicked(page: number) {
    this.onClick.emit(page);
  }
}
