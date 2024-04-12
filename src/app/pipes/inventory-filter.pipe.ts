import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryFilter',
  standalone: true
})
export class InventoryFilterPipe implements PipeTransform {

  transform(value: , ...args: unknown[]): unknown {
    return null;
  }

}
