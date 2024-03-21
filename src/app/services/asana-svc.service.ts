import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { IAsana } from '../modules/IAsana';
import { IResponseDataAsana } from '../modules/IResponseDataAsana';
import { IResponseUser } from '../modules/IResponseUser';
import { GeneralMetodService } from './general-metod.service';

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

  constructor(
    private http: HttpClient,
    private generalMethods: GeneralMetodService
  ) { }

  getAllAsana(): Observable<IResponseDataAsana> {
    const header = this.generalMethods.getHeaders()
    return this.http.get<IResponseDataAsana>(this.getAllAsanaUrl, { headers: header }).pipe(tap(data => {
      let sortedData = data.response.sort((a, b) => (a.id - b.id))
      this.allAsanaBvr.next(sortedData)
    }))
  }

  getUser(): Observable<IResponseUser> {
    const header = this.generalMethods.getHeaders()
    let id: string | null = localStorage.getItem('idUser')
    return this.http.get<IResponseUser>(this.getSingleUserUrl + id, { headers: header }).pipe(tap(data => {
      this.favoriteAsanas = data.response.asana;
      this.favoriteAsanaBvr.next(this.favoriteAsanas)
    }))
  }

  addTofavorites(idAsana: string, asana: IAsana): Observable<IResponseUser> {
    const header = this.generalMethods.getHeaders()
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
    const header = this.generalMethods.getHeaders()
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
}
