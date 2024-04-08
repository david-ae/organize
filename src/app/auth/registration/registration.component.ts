import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatStepperModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {}
