import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * @param value
   * @param key
   */
  set(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  get(key: string) {
    return localStorage.getItem(key)
  }
}
