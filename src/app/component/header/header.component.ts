import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LogSvcService } from '../../services/log-svc.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  username!: string | null;
  admin: boolean = false;
  jwt: JwtHelperService = new JwtHelperService()
  menuVisibility: boolean = false;
  subLoginIn!:Subscription;

  constructor(
    private logSvc: LogSvcService,
    public router: Router) { }

  ngOnInit(): void {
  this.menuVisibility= false;

    this.subLoginIn = this.logSvc.authLog$.subscribe(auth => {

      if (auth) {
        this.loggedIn = auth;
        this.username = localStorage.getItem('username')
        let role = localStorage.getItem('role')
        if (role === "ADMIN") {
          this.admin = true;
        }
        else {
          this.admin = false;
        }
      } else {
        this.loggedIn = auth;
      }
    });
  }
  ngOnDestroy(): void {
    if(this.subLoginIn){ this.subLoginIn.unsubscribe()}
    document.removeEventListener('click', this.onClick);
  }

  logOut(): void {
    this.admin = false;
    this.username = '';
    this.logSvc.logOut();
    this.router.navigate(['/login']);
    this.removeClassMenuUser();
  }

  isInLog(): boolean {
    return this.router.url === '/login';
  }
  isInSign(): boolean {
    return this.router.url === '/register';
  }

  removeClassMenuUser(){
    this.menuVisibility = !this.menuVisibility;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if ((event.target instanceof HTMLElement && !event.target.closest('#menu-user') && !event.target.closest('.arr-header'))) {
      this.menuVisibility = false;  }
  }

}
