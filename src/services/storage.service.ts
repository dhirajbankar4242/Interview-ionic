import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  // getItem(key: string): any {
  //   return localStorage.getItem(key);
  // }
  async getItem(key: string): Promise<any> {
  return await localStorage.getItem(key);
}



  async clear() {
    await localStorage.clear();
  }
}
