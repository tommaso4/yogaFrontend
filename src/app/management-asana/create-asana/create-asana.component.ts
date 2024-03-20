import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { ManagementAsanaComponent } from '../management-asana.component';
import { ManagementSvcService } from '../../services/management-svc.service';
import { IAsana } from '../../modules/IAsana';

@Component({
  selector: 'app-create-asana',
  templateUrl: './create-asana.component.html',
  styleUrl: './create-asana.component.scss'
})
export class CreateAsanaComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subCreateAsana!: Subscription;
  errorStatus: boolean = false;
  error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private managemntSvc: ManagementSvcService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(null, [Validators.required]),
      name: this.formBuilder.control(null, [Validators.required]),
      description: this.formBuilder.control(null, [Validators.required]),
      drishti: this.formBuilder.control(null, [Validators.required]),
      typeAsana: this.formBuilder.control(null, [Validators.required]),
      urlImg: this.formBuilder.control(null, [Validators.required]),
      benefit: this.formBuilder.control(null, [Validators.required]),
    })
  }
  submit() {
    console.log(this.form.value);

    this.subCreateAsana = this.managemntSvc.createAsana(this.form.value).pipe(
      catchError(err => {
        this.errorStatus = true;
        this.error = err.error.message;
        throw err;
      })).subscribe(() => {
        alert('new asana created successfully')
        this.form.reset()
      })

  }

  errStatusBack() {
    this.errorStatus = !this.errorStatus;
  }

  ngOnDestroy(): void {
    if (this.subCreateAsana) this.subCreateAsana.unsubscribe()
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
