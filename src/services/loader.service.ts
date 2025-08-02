import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject<number>(-1);

  constructor() {
  }

  startLoading(progress = 100) {
    this.loadingSubject.next(progress);
  }

  stopLoading() {
    this.loadingSubject.next(-1);
  }

  getLoadingState(): Observable<number> {
    return this.loadingSubject.asObservable();
  }
}
