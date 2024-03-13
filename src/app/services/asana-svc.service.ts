import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { IAsana } from '../modules/IAsana';

@Injectable({
  providedIn: 'root'
})
export class AsanaSvcService {

  getAllUrl: string = 'http://localhost:8080/asana/getAll';
  allAsanaBhvr: BehaviorSubject<IAsana[]| undefined> = new BehaviorSubject<IAsana[]| undefined>(undefined);
  allAsana$ = this.allAsanaBhvr.asObservable();

  constructor(private http: HttpClient,
  ) { }

  getAllAsana(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      return this.http.get<any>(this.getAllUrl, { headers: header }).pipe(tap(data =>{
        this.allAsanaBhvr.next(data.response)
      }))
    }else
    return EMPTY;
  }
}
