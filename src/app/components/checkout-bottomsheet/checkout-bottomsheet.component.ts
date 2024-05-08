import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-checkout-bottomsheet',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './checkout-bottomsheet.component.html',
  styleUrl: './checkout-bottomsheet.component.css',
})
export class CheckoutBottomsheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CheckoutBottomsheetComponent>
  ) {}

  openLink(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
