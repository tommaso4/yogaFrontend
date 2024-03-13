import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregister } from '../modules/Iregister';
import { BehaviorSubject, Observable, Subscription, take, tap } from 'rxjs';
import { ILogin } from '../modules/ilogin';
import { Iresponse } from '../modules/Iresponse';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LogSvcService {

  signInUrl: string = "http://localhost:8080/auth/register";
  logInUrl: string = "http://localhost:8080/auth/login";

  isLoggedIn :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authLog$ = this.isLoggedIn.asObservable();
  jwt: JwtHelperService = new JwtHelperService()




  token3: BehaviorSubject<string> = new BehaviorSubject<string>("");
  token$ = this.token3.asObservable();
  // loggedInSubscription!: Subscription;
  // tokenSubscription!: Subscription;



  constructor(
    public http: HttpClient,
    ) { }

  register(user:Iregister): Observable<Iresponse> {
    return this.http.post<Iresponse>(this.signInUrl,user)
  }

  login(user:ILogin): Observable<Iresponse>{
    return this.http.post<Iresponse>(this.logInUrl, user)
    .pipe(tap((data) =>{
      const token = data.response
      localStorage.setItem('token',token)
      let username = this.jwt.decodeToken(token).username;
      localStorage.setItem('username',username)
      let role = this.jwt.decodeToken(token).role;
      localStorage.setItem('role',role)

      this.isLoggedIn.next(true)
    }))
  }


  logOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.isLoggedIn.next(false)
  }
}
