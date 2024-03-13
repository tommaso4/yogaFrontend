import { Component } from '@angular/core';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription } from 'rxjs';
import { IAsana } from '../../modules/IAsana';
import { Router } from '@angular/router';

@Component({
  selector: 'app-belance-pose',
  templateUrl: './belance-pose.component.html',
  styleUrl: './belance-pose.component.scss'
})
export class BelancePoseComponent {


  allAsana! : IAsana[] |undefined;
  myAsana! :IAsana[]| undefined;
  unsubscribeAsana!: Subscription;

  constructor(
    private asanaSvc: AsanaSvcService,
    ){}


  ngOnInit(): void {
      this.unsubscribeAsana =this.asanaSvc.allAsana$.subscribe(data=>{
        this.allAsana = data
        this.myAsana = this.allAsana?.filter(asana=>asana.typeAsana=== "BALANCEPOSE")})
  }
  ngOnDestroy(): void {
    this.unsubscribeAsana.unsubscribe();
  }
}
