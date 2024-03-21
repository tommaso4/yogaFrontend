import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { ManagementAsanaComponent } from '../management-asana.component';
import { ManagementSvcService } from '../../services/management-svc.service';
import { IAsana } from '../../modules/IAsana';
import { GeneralMetodService } from '../../services/general-metod.service';

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
    private managemntSvc: ManagementSvcService,
    private generalMethod: GeneralMetodService
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

  isValidAndTouched(nameForm: string): boolean | undefined {
    return this.generalMethod.isValidAndTouched(nameForm,this.form)
  }

}
