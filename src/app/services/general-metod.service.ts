import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralMetodService {

  constructor() { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      return header
    } else return new HttpHeaders()
  }

  isValid(nameForm: string, form:FormGroup): boolean | undefined {
    return form.get(nameForm)?.valid
  }

  isTouched(nameForm: string, form:FormGroup): boolean | undefined {
    return form.get(nameForm)?.touched
  }

  isValidAndTouched(nameForm: string, form:FormGroup): boolean | undefined {
    return !this.isValid(nameForm,form) && this.isTouched(nameForm, form)
  }
}
