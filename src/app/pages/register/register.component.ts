import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogSvcService } from '../../services/log-svc.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { GeneralMetodService } from '../../services/general-metod.service';

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
    private formBuider: FormBuilder,
    private logSvc: LogSvcService,
    private router: Router,
    private generalMethod: GeneralMetodService
    ) { }


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
    })).subscribe(()=>{
      alert('user with username: '+ this.form.value.username + 'created successfully')
      this.router.navigate(['/login']);

    })
  }

  isValidAndTouched(nameForm:string):boolean|undefined{
    return this.generalMethod.isValidAndTouched(nameForm, this.form)
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
