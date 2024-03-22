import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { IUserLogin } from '../modules/IUserLogin';
import { IresponseToken } from '../modules/IresponseToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserRegister } from '../modules/IUserRegister';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogSvcService implements OnDestroy {

  signInUrl: string = "http://localhost:8080/auth/register";
  logInUrl: string = "http://localhost:8080/auth/login";

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authLog$ = this.isLoggedIn.asObservable();
  jwt: JwtHelperService = new JwtHelperService()
  logOutTimer: any;
  subAuth!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.isLogged()
    this.startLogoutTimer()
    this.setupEventListeners()
    this.setWindowCloseListener()
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    if (this.subAuth) this.subAuth.unsubscribe();
  }


  register(user: IUserRegister): Observable<IresponseToken> {
    return this.http.post<IresponseToken>(this.signInUrl, user)
  }

  login(user: IUserLogin): Observable<IresponseToken> {
    return this.http.post<IresponseToken>(this.logInUrl, user)
      .pipe(tap((data) => {
        const token = data.response
        localStorage.setItem('token', token)
        let username = this.jwt.decodeToken(token).username;
        localStorage.setItem('username', username)
        let role = this.jwt.decodeToken(token).role;
        localStorage.setItem('role', role)
        let id = this.jwt.decodeToken(token).idUser;
        localStorage.setItem('idUser', id)
        this.isLoggedIn.next(true)
      }))
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('idUser');
    this.isLoggedIn.next(false)
    this.router.navigate(['/login']);
  }

  logoutLessNavigate(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('idUser');
    this.isLoggedIn.next(false)
  }

  isLogged() {
    let token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.next(true);
    }
    else this.isLoggedIn.next(false)
  }

  startLogoutTimer() {
    this.subAuth = this.authLog$.subscribe(auth => {
      if (auth) {
        this.logOutTimer = setTimeout(() => this.logOut(), 3600000)
      }
    })
  }

  private setupEventListeners() {
    window.addEventListener('mousemove', () => this.resetLogoutTimer());
    window.addEventListener('keypress', () => this.resetLogoutTimer());
  }

  private removeEventListeners() {
    window.removeEventListener('mousemove', () => this.resetLogoutTimer());
    window.removeEventListener('keypress', () => this.resetLogoutTimer());
  }

  private resetLogoutTimer() {
    if (this.logOutTimer) {
      clearTimeout(this.logOutTimer);
      this.startLogoutTimer();
    }
  }
  setWindowCloseListener() {
    window.addEventListener('beforeunload', () => {
      this.logOut()
    })
  }
}
