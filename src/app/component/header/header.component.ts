import { Component, OnInit } from '@angular/core';
import { LogSvcService } from '../../services/log-svc.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  username!: string | null;
  admin: boolean = false;
  jwt: JwtHelperService = new JwtHelperService()

  constructor(private logSvc: LogSvcService,
    public router: Router) { }

  ngOnInit(): void {

    this.logSvc.authLog$.subscribe(auth => {
      if (auth) {
        console.log(auth);

        this.loggedIn = true;
        this.username = localStorage.getItem('username')
        console.log(this.username);

        let role = localStorage.getItem('role')
        console.log(role);

        if (role === "ADMIN") {
          this.admin = true;
          console.log("admin");
        }
        else {
          this.admin = false;
          console.log("client");
        }
      } else {
        this.loggedIn = false;
      }
    });
  }

  logOut(): void {
    this.admin = false;
    this.username = '';
    this.logSvc.logOut();
    this.router.navigate(['']);
  }

  isInLog(): boolean {
    return this.router.url === '/';
  }
  isInSign(): boolean {
    return this.router.url === '/register';
  }
}
