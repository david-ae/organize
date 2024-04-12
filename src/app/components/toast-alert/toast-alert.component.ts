import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast-alert',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './toast-alert.component.html',
  styleUrl: './toast-alert.component.css',
})
export class ToastAlertComponent {
  @Input() message!: string;
  @Input() alertType!: string;

  toastr = inject(ToastrService);

  showSuccess() {
    this.toastr.success(this.message, this.alertType);
  }
}
