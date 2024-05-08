import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/domain/item';

@Pipe({
  name: 'searchitems',
  standalone: true,
})
export class ItemsPipe implements PipeTransform {
  transform(items: Item[], searchText: string): Item[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return (
        item.category.toLowerCase().includes(searchText) ||
        item.name.toLowerCase().includes(searchText) ||
        item.price.toString().includes(searchText) ||
        item.quantity?.toString().includes(searchText)
      );
    });
  }
}
