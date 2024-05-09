import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';


@Component({
  selector: 'app-logoutdialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './logoutdialog.component.html',
  styleUrl: './logoutdialog.component.css',
})
export class LogoutdialogComponent {

}
