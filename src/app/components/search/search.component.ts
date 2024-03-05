import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateItemComponent } from '../dialogs/update-item/update-item.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(UpdateItemComponent, {
      data: { name: 'Organize' },
      width: '600px',
      backdropClass: 'updateItemModal',
    });

    dialogRef.afterOpened().subscribe((result) => {
      console.log(`${result}`);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`${result}`);
    });
  }
}
