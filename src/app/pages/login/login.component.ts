import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogSvcService } from '../../services/log-svc.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  jwt: JwtHelperService = new JwtHelperService();
  errorStatus: boolean = false;
  error!: string;
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public logSvc: LogSvcService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required])
    })
  }

  submit(): void {
    this.loading = true;
    this.logSvc.login(this.form.value).pipe(
      catchError(err => {
        console.error(err);
        this.errorStatus = true;
        this.error = err.error.message;
        this.loading = false;
        throw err;
      })
    ).subscribe(data => {
      let token: string = data.response;
      if (token) {
        // this.logSvc.isLoggedIn.next(true)
        let role: string | null = this.jwt.decodeToken(token).role;
        if (role) {
          if (role === 'ADMIN') {
            this.router.navigate(['/createAsana']);
          } else if (role === 'CLIENT') {
            this.router.navigate(['/home']);
          }
          this.loading = false;
        }
      }
    });
  }

  isValid(nameForm: string): boolean | undefined {
    return this.form.get(nameForm)?.valid
  }

  isTouched(nameForm: string): boolean | undefined {
    return this.form.get(nameForm)?.touched
  }

  isValidAndTouched(nameForm: string): boolean | undefined {
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }
}
