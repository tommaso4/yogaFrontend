import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAsana } from '../../modules/IAsana';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription, Unsubscribable, catchError } from 'rxjs';

@Component({
  selector: 'app-stand-pose',
  templateUrl: './stand-pose.component.html',
  styleUrl: './stand-pose.component.scss'
})
export class StandPoseComponent implements OnInit, OnDestroy{

  allAsana! : IAsana[] |undefined;
  myAsana! :IAsana[]| undefined;
  unsubscribeAsana!: Subscription;

  constructor(
    private asanaSvc: AsanaSvcService
    ){}


  ngOnInit(): void {
      this.unsubscribeAsana =this.asanaSvc.allAsana$.subscribe(data=>{
        this.allAsana = data
        this.myAsana = this.allAsana?.filter(asana=>asana.typeAsana=== "STANDPOSE")})
  }
  ngOnDestroy(): void {
    this.unsubscribeAsana.unsubscribe();
  }

  // ngOnInit(): void {
  //   this.unsubscribeAsana = this.asanaSvc.allAsana$.subscribe(data => {
  //     this.allAsana = data;
  //     this.myAsana = this.allAsana?.filter(asana => asana.typeAsana === "SITPOSE");
  //     console.log(this.myAsana); // Sposta qui la stampa
  //   });
  // }
}
