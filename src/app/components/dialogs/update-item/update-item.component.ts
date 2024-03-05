import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css',
})
export class UpdateItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
