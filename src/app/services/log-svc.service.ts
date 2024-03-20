import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../modules/IUserLogin';
import { IresponseToken } from '../modules/IresponseToken';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserRegister } from '../modules/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class LogSvcService {

  signInUrl: string = "http://localhost:8080/auth/register";
  logInUrl: string = "http://localhost:8080/auth/login";
  deleteUserUrl: string = "http://localhost:8080/user/delete/";

  isLoggedIn :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authLog$ = this.isLoggedIn.asObservable();
  jwt: JwtHelperService = new JwtHelperService()

  constructor(
    public http: HttpClient,
    ) {this.isLogged()}

  register(user:IUserRegister): Observable<IresponseToken> {
    return this.http.post<IresponseToken>(this.signInUrl,user)
  }

  login(user:IUserLogin): Observable<IresponseToken>{
    return this.http.post<IresponseToken>(this.logInUrl, user)
    .pipe(tap((data) =>{
      const token = data.response
      localStorage.setItem('token',token)
      let username = this.jwt.decodeToken(token).username;
      localStorage.setItem('username',username)
      let role = this.jwt.decodeToken(token).role;
      localStorage.setItem('role',role)
      let id = this.jwt.decodeToken(token).idUser;
      localStorage.setItem('idUser',id)
      this.isLoggedIn.next(true)
    }))
  }

  logOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('idUser');
    this.isLoggedIn.next(false)
  }
  isLogged(){
    let token = localStorage.getItem('token');
    if(token) this.isLoggedIn.next(true)
    else  this.isLoggedIn.next(false)
  }

  deleteUser(idUser:string):Observable<any>{
    const header = this.getHeaders();
    return this.http.delete(this.deleteUserUrl+idUser, {headers: header})
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      return header
    } else return new HttpHeaders()
  }
}
