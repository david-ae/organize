import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmreject-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirmreject-dialog.component.html',
  styleUrl: './confirmreject-dialog.component.css'
})
export class ConfirmrejectDialogComponent {
@Input() title!: string;
@Input() message!:string;
}
