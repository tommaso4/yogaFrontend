import { GeneralMetodService } from './../../services/general-metod.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogSvcService } from '../../services/log-svc.service';
import { Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  jwt: JwtHelperService = new JwtHelperService();
  errorStatus: boolean = false;
  error!: string;
  loading: boolean = false;
  subLogin!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private logSvc: LogSvcService,
    private router: Router,
    private generalMethod: GeneralMetodService
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required])
    })
  }

  ngOnDestroy(): void {
    if(this.subLogin)this.subLogin.unsubscribe();
  }

  submit(): void {
    this.loading = true;
    this.subLogin = this.logSvc.login(this.form.value).pipe(
      catchError(err => {
        this.errorStatus = true;
        this.error = err.error.message;
        this.loading = false;
        throw err;
      })
    ).subscribe(data => {
      let token: string = data.response;
      if (token) {
        let role: string | null = this.jwt.decodeToken(token).role;
        if (role) {
          if (role === 'ADMIN') {
            this.popuplogo()
            setTimeout(()=>{
              this.router.navigate(['/managementAsana']);
            }, 4500)
          } else if (role === 'CLIENT') {
            this.popuplogo()
            setTimeout(()=>{
              this.router.navigate(['/home']);
            }, 4500)
          }
          this.loading = false;
        }
      }
    });
  }

  isValidAndTouched(nameForm: string): boolean | undefined {
    return this.generalMethod.isValidAndTouched(nameForm, this.form)
  }

  popuplogo(){
    const logo = document.getElementById('container-popup')
    logo?.classList.remove('d-none')
  }
}
