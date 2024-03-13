import { Component, HostListener, OnInit, Output } from '@angular/core';
import { ScrollSvcService } from '../../services/scroll-svc.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  headerHeight: number | undefined = 0;
  isSticky : boolean = false;

  constructor(private scrollSvc: ScrollSvcService){}

  ngOnInit(): void {
    this.headerHeight = document.getElementById('header')?.offsetHeight;
    this.scrollSvc.isSticky$.subscribe(isSticky=>{
      this.isSticky = isSticky;
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(){
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(scrollPosition >= this.headerHeight!){
      this.scrollSvc.setSticky(true)
    }else{
      this.scrollSvc.setSticky(false)
    }
  }
}
