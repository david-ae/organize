import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  constructor() {}

  addItemToLocalStorage(key: string, item: T) {
    const value = JSON.stringify(item);
    localStorage.setItem(key, value);
  }

  getItemFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
}
