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

  allAsanaBvr: BehaviorSubject<IAsana[] | undefined> = new BehaviorSubject<IAsana[] | undefined>(undefined);
  allAsana$ = this.allAsanaBvr.asObservable();

  favoriteAsanas: Map<number, boolean> = new Map<number, boolean>();
  favoriteAsanasBvr: BehaviorSubject<Map<number, boolean>> = new BehaviorSubject<Map<number, boolean>>(new Map<number, boolean>());
  favoriteAsanas$: Observable<Map<number, boolean>> = this.favoriteAsanasBvr.asObservable();


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
        data.response.forEach((asana: IAsana) => {
          this.favoriteAsanas.set(asana.id, false);
        });
        this.favoriteAsanasBvr.next(new Map<number, boolean>(this.favoriteAsanas))
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
      return this.http.get<any>(this.getSingleUserUrl + id, { headers: header });
    } else return EMPTY;
  }

  addTofavorites(idAsana: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      let idUser = localStorage.getItem('idUser')
      this.favoriteAsanas.set(parseInt(idAsana), true)
      this.favoriteAsanasBvr.next(new Map<number,boolean>(this.favoriteAsanas))

      return this.http.patch(this.patchAsanaToUser + idAsana + '/' + idUser, {}, { headers: header })
    } else return EMPTY
  }

  isAsanaFavorite(idAsana: number): boolean {
    if(this.favoriteAsanas.get(idAsana))
    return true
    else
    return false;
  }
}
