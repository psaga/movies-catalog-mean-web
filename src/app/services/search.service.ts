import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private termSource = new BehaviorSubject<string>('');
  actualTerm = this.termSource.asObservable();

  changeTerm(term: string) {
    this.termSource.next(term);
  }

}
