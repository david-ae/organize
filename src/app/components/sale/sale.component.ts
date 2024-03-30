import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
})
export class SaleComponent {}
