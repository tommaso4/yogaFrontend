import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription } from 'rxjs';
import { IAsana } from '../../modules/IAsana';

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
}
