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
  setArrowOnScroll() {
    window.addEventListener('scroll', () => {
      const scrollPosition: number = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollPositionVh: number = parseInt((scrollPosition / (window.innerHeight / 100)).toFixed())
      const arrowRight = document.getElementById('arrow-r')
      if (arrowRight)
        if (scrollPositionVh >= 0 && scrollPositionVh <= 12) {
          let topOnScroll = (22 - scrollPositionVh).toString();
          arrowRight.style.top = `${topOnScroll}vh`;
        } else if (scrollPositionVh >= 12) {
          arrowRight.style.top = `10vh`;
        }
    })
  }
  setHeightAsideOnScroll() {
    window.addEventListener('scroll', () => {
      const scrollPosition: number = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollPositionVh: number = parseInt((scrollPosition / (window.innerHeight / 100)).toFixed())
      const asideBar = document.getElementById('aside-bar')
      if (asideBar)
        if (scrollPositionVh >= 0 && scrollPositionVh <= 12) {
          let heightOnScroll = (68 + scrollPositionVh).toString();
          asideBar.style.height = `${heightOnScroll}vh`;
        } else if (scrollPositionVh >= 12) {
          asideBar.style.height = `80vh`;
        }
    })
  }
}
