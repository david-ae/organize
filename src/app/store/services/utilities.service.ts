import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  data$ = new BehaviorSubject<ElementRef | undefined>(undefined);

  constructor() {}
}
