import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { IAsana } from '../modules/IAsana';
import { IResponseDataAsana } from '../modules/IResponseDataAsana';
import { IResponseUser } from '../modules/IResponseUser';

@Injectable({
  providedIn: 'root'
})
export class AsanaSvcService {

  getAllAsanaUrl: string = 'http://localhost:8080/asana/getAll';
  getSingleUserUrl: string = 'http://localhost:8080/user/'
  patchAsanaToUser: string = 'http://localhost:8080/user/addAsana/'
  patchRemoveAsanaToUser: string = 'http://localhost:8080/user/removeAsana/'

  allAsanaBvr: BehaviorSubject<IAsana[] | undefined> = new BehaviorSubject<IAsana[] | undefined>(undefined);
  allAsana$ = this.allAsanaBvr.asObservable();

  public favoriteAsanas: IAsana[] | undefined = [];
  favoriteAsanaBvr: BehaviorSubject<IAsana[] | undefined> = new BehaviorSubject<IAsana[] | undefined>(undefined)
  favorite$ = this.favoriteAsanaBvr.asObservable()

  constructor(private http: HttpClient,
  ) { }

  getAllAsana(): Observable<IResponseDataAsana> {
    const header = this.getHeaders();
    return this.http.get<IResponseDataAsana>(this.getAllAsanaUrl, { headers: header }).pipe(tap(data => {
      this.allAsanaBvr.next(data.response)
    }))
  }

  getUser(): Observable<IResponseUser> {
    const header = this.getHeaders();
    let id: string | null = localStorage.getItem('idUser')
    return this.http.get<IResponseUser>(this.getSingleUserUrl + id, { headers: header }).pipe(tap(data => {
      this.favoriteAsanas = data.response.asana;
      this.favoriteAsanaBvr.next(this.favoriteAsanas)
    }))
  }

  addTofavorites(idAsana: string, asana: IAsana): Observable<IResponseUser> {
    const header = this.getHeaders();
    this.addToArrFavorite(asana)
    let idUser = localStorage.getItem('idUser')
    return this.http.patch<IResponseUser>(this.patchAsanaToUser + idAsana + '/' + idUser, {}, { headers: header })
  }

  addToArrFavorite(asana: IAsana) {
    let sub: Subscription = this.favorite$.subscribe(data => { this.favoriteAsanas = data })
    if (this.favoriteAsanas)
    this.favoriteAsanas.push(asana);
    this.favoriteAsanaBvr.next(this.favoriteAsanas)
    sub.unsubscribe()
  }

  removeToFavorite(idAsana: string, asana: IAsana): Observable<IResponseUser> {
    const header = this.getHeaders();
    this.removeToArrFavorite(asana)
    let idUser = localStorage.getItem('idUser')
    return this.http.patch<IResponseUser>(this.patchRemoveAsanaToUser + idAsana + '/' + idUser, {}, { headers: header })
  }

  removeToArrFavorite(asana: IAsana) {
    let sub: Subscription = this.favorite$.subscribe(data => { this.favoriteAsanas = data })
    if (this.favoriteAsanas)
    this.favoriteAsanas = this.favoriteAsanas.filter(asa => asa.id !== asana.id);
    this.favoriteAsanaBvr.next(this.favoriteAsanas)
    sub.unsubscribe()
  }

  isAsanaFavorite(asana: IAsana): boolean {
    if (this.favoriteAsanas)
      return this.favoriteAsanas.some(asa => asa.id === asana.id);
    else return false
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
