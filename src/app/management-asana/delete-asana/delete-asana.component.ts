import { GeneralMetodService } from './../../services/general-metod.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementSvcService } from '../../services/management-svc.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-delete-asana',
  templateUrl: './delete-asana.component.html',
  styleUrl: './delete-asana.component.scss'
})
export class DeleteAsanaComponent implements OnInit ,OnDestroy{

  form!:FormGroup;
  visibility:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private generalMetod: GeneralMetodService,
    private managementSvc: ManagementSvcService
  ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(null, Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.visibility = false;
  }

 deleteAsana(){
  let idAsana = localStorage.getItem('idAsana');
  if(idAsana)
  this.managementSvc.deleteAsana(idAsana).pipe().subscribe(()=>{
    alert('Asana deleted successfully')
    this.visibility = false;
  })
 }

  isValidAnfTouched(nameForm:string):boolean | undefined{
    return this.generalMetod.isValidAndTouched(nameForm, this.form)
  }

  visibilityTrue(){
    localStorage.setItem('idAsana', this.form.value.id)
    this.form.reset()
    this.visibility = true;
  }

  visibilityFalse(){
    localStorage.removeItem('idAsana')
    this.visibility = false;
  }
}
