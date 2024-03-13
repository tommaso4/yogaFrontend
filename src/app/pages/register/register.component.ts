import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogSvcService } from '../../services/log-svc.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  pswRegex: string = `^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$`;
  loading:boolean = false;


  constructor(
    public formBuider: FormBuilder,
    public logSvc: LogSvcService,
    public router: Router) { }


  ngOnInit(): void {
    this.form = this.formBuider.group({
      name: this.formBuider.control(null, [Validators.required]),
      surname: this.formBuider.control(null, [Validators.required]),
      username: this.formBuider.control(null, [Validators.required]),
      email: this.formBuider.control(null, [Validators.required, Validators.email]),
      password1: this.formBuider.control(null, [Validators.required, Validators.pattern(this.pswRegex)]),
      password: this.formBuider.control(null,[Validators.required, this.passwordMatchValidator] as Validators),
    })
  }
  submit(): void {
    this.form.value.name = this.form.value.name.charAt(0) + this.form.value.name.slice(1).toLowerCase();
    this.form.value.surname = this.form.value.surname.charAt(0) + this.form.value.surname.slice(1).toLowerCase();
    this.loading = true;
    delete this.form.value.passwodr1;

    this.logSvc.register(this.form.value).pipe(catchError(err=>{
      this.loading = false;
      console.log(err);
      throw err;
    })).subscribe(data=>{
      console.log(data)
      this.router.navigate(['']);
    })
  }
  isValid(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.valid
  }

  isTouched(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.touched
  }

  isValidAndTouched(nameForm:string):boolean|undefined{
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }

  passwordMatchValidator=(formC:FormControl):ValidationErrors|null => {
    if(formC.value!=this.form?.get(`password1`)?.value){
      return {
        invalid: true,
        message: 'Le password sono diverse!!'
      }
    }
    return null;
  }

  getCustomMessage(nameForm:string){
    return this.form.get(nameForm)?.errors!['message']
  }
}
