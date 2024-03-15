import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { IAsana } from '../modules/IAsana';

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

  private favoriteAsanas: IAsana[] = [];


  constructor(private http: HttpClient,
  ) { }

  getAllAsana(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      return this.http.get<any>(this.getAllAsanaUrl, { headers: header }).pipe(tap(data => {
        this.allAsanaBvr.next(data.response)
      }))
    } else return EMPTY;
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      let id: string | null = localStorage.getItem('idUser')
      return this.http.get<any>(this.getSingleUserUrl + id, { headers: header }).pipe(tap(data => {
        this.favoriteAsanas = data.response.asana;
        console.log(this.favoriteAsanas);

      }))
    } else return EMPTY;
  }

  addTofavorites(idAsana: string, asana:IAsana): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      this.addToArrFavorite(asana)
      let idUser = localStorage.getItem('idUser')
      return this.http.patch(this.patchAsanaToUser + idAsana + '/' + idUser, {}, { headers: header })
    } else return EMPTY
  }

  addToArrFavorite(asana: IAsana) {
    this.favoriteAsanas.push(asana);
  }

  removeToFavorite(idAsana: string, asana:IAsana): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      this.removeToArrFavorite(asana)
      let idUser = localStorage.getItem('idUser')
      return this.http.patch(this.patchRemoveAsanaToUser + idAsana + '/' + idUser, {}, { headers: header })
    } else return EMPTY
  }

  removeToArrFavorite(asana: IAsana) {
    this.favoriteAsanas = this.favoriteAsanas.filter(asa => asa.id !== asana.id);
  }

  isAsanaFavorite(asana: IAsana): boolean {
    return this.favoriteAsanas.some(asa => asa.id === asana.id);
  }
}
