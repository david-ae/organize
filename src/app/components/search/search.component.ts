import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateItemComponent } from '../dialogs/update-item/update-item.component';
import { MatButtonModule } from '@angular/material/button';
import { SellItemComponent } from '../dialogs/sell-item/sell-item.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private dialog: MatDialog) {}

  sellItems() {
    let dialogRef = this.dialog.open(SellItemComponent, {
      data: { name: 'Organize' },
    });

    dialogRef.afterOpened().subscribe((result) => {
      console.log(`${result}`);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`${result}`);
    });
  }
}
