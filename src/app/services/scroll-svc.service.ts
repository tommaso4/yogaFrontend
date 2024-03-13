import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollSvcService {
  private isStickySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSticky$: Observable<boolean> = this.isStickySubject.asObservable();

  private isOpen: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false)
  isOpen$: Observable<boolean> = this.isOpen.asObservable();

  setSticky(isSticky: boolean): void {
    this.isStickySubject.next(isSticky);
  }

  setIsOpen(isOpen:boolean): void{
    this.isOpen.next(isOpen);
  }
}
