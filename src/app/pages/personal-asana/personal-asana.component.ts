import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAsana } from '../../modules/IAsana';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-personal-asana',
  templateUrl: './personal-asana.component.html',
  styleUrl: './personal-asana.component.scss'
})
export class PersonalAsanaComponent implements OnInit , OnDestroy {

  myAsana!: IAsana[];
  subMyAsana!: Subscription

  constructor(
    private asanaSvc : AsanaSvcService
  ){}


  ngOnInit(): void {
    this.subMyAsana= this.asanaSvc.getUser().pipe(
      catchError(error =>{
        throw error;
      })
    ).subscribe(data=>{
      this.myAsana = data.response.asana
    })
  }

  ngOnDestroy(): void {
    this.subMyAsana.unsubscribe()

  }
}
