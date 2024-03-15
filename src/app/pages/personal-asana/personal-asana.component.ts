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

  myAsana!: IAsana[] | undefined;
  subMyAsana!: Subscription

  constructor(
    private asanaSvc : AsanaSvcService
  ){}


  ngOnInit(): void {
    this.myAsana = this.asanaSvc.favoriteAsanas;
  }

  ngOnDestroy(): void {
    this.myAsana = [];
  }
}
