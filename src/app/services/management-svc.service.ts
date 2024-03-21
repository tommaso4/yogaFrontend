import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsana } from '../modules/IAsana';
import { IGenericResponse } from '../modules/igeneric-response';
import { GeneralMetodService } from './general-metod.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementSvcService {

  createAsanaUrl: string = 'http://localhost:8080/asana/create';
  deleteUserUrl: string = "http://localhost:8080/user/delete/";
  deleteAsanaUrl:string = 'http://localhost:8080/asana/delete/'



  constructor(
    private http: HttpClient,
    private generalMethods: GeneralMetodService

  ) { }

  createAsana(asana: any):Observable<IGenericResponse> {
    const header =  this.generalMethods.getHeaders()
    return this.http.post<IGenericResponse>(this.createAsanaUrl,asana,{headers: header})
  }

  deleteUser(idUser: string): Observable<any> {
    const header = this.generalMethods.getHeaders();
    return this.http.delete(this.deleteUserUrl + idUser, { headers: header })
  }

  deleteAsana(idAsana:string):Observable<any>{
    const header = this.generalMethods.getHeaders();
    return this.http.delete(this.deleteAsanaUrl + idAsana,{headers: header})
  }
}
