import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription, catchError, pipe } from 'rxjs';
import { IAsana } from '../../modules/IAsana';

@Component({
  selector: 'app-stand-pose',
  templateUrl: './stand-pose.component.html',
  styleUrl: './stand-pose.component.scss'
})
export class StandPoseComponent implements OnInit, OnDestroy{

  myAsana! :IAsana[]| undefined;
  unsubscribeAsana!: Subscription;

  constructor(
    private asanaSvc: AsanaSvcService
    ){}


  ngOnInit(): void {
      this.unsubscribeAsana =this.asanaSvc.allAsana$.subscribe(data=>{
        this.myAsana = data?.filter(asana=>asana.typeAsana=== "STANDPOSE")})
  }
  ngOnDestroy(): void {
    this.unsubscribeAsana.unsubscribe();
  }

  addToFavorites(idAsana:number):void{
    this.asanaSvc.addTofavorites(idAsana.toString()).pipe(
      catchError(err =>{
        throw err;
      })).subscribe()
  }

  isFavorited(idAsana:number):boolean{
    return this.asanaSvc.isAsanaFavorite(idAsana)
  }

}
