import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsana } from '../modules/IAsana';
import { IGenericResponse } from '../modules/igeneric-response';

@Injectable({
  providedIn: 'root'
})
export class ManagementSvcService {

  urlAsanaCreate: string = 'http://localhost:8080/asana/create';

  constructor(
    private http: HttpClient,

  ) { }

  createAsana(asana: any):Observable<IGenericResponse> {
    const header =  this.getHeaders()
    return this.http.post<IGenericResponse>(this.urlAsanaCreate,asana,{headers: header})
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
