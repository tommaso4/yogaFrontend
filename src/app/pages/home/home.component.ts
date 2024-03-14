import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IAsana } from '../../modules/IAsana';
import { ScrollSvcService } from '../../services/scroll-svc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {

  allAsana!: IAsana[];
  asanaSubscription!: Subscription;
  isSticky : boolean = false;
  isOpen: boolean = false;

  constructor(
    private router: Router,
    private asanaSvc: AsanaSvcService,
    private scrollSvc:ScrollSvcService
  ) {}

  ngOnInit(): void {
        this.fetchAllAsana();
        this.scrollSvc.isSticky$.subscribe(data=>{
          this.isSticky = data;
        })
        this.scrollSvc.isOpen$.subscribe(data=>{
          this.isOpen = data;
        })
        this.scrollSvc.setArrowOnScroll()
  }

  ngOnDestroy(): void {
    if (this.asanaSubscription)this.asanaSubscription.unsubscribe()
  }

  fetchAllAsana(): void {
    this.asanaSubscription = this.asanaSvc.getAllAsana().pipe(
      catchError(err => {
        throw err;
      })
    ).subscribe(data => {
      this.allAsana = data.response;
    });
  }

  isInHome(): boolean {
    return this.router.url === '/home';
  }

  // aside-bar
  open():void{
    this.scrollSvc.setIsOpen(true)
  }
}
