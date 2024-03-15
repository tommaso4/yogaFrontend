import { Component, Input } from '@angular/core';
import { Subscription, catchError } from 'rxjs';
import { IAsana } from '../../modules/IAsana';
import { AsanaSvcService } from '../../services/asana-svc.service';

@Component({
  selector: 'app-heart-svg',
  templateUrl: './heart-svg.component.html',
  styleUrl: './heart-svg.component.scss'
})
export class HeartSvgComponent {

  @Input() asanaId!: number;
  @Input() asana!: IAsana ;

  unsubscribeAddAsana!: Subscription;
  unsubscribeRemoveAsana!: Subscription;

  constructor(
    private asanaSvc: AsanaSvcService
  ){}

  addToFavorites():void{
    this.unsubscribeAddAsana = this.asanaSvc.addTofavorites(this.asanaId.toString(), this.asana).pipe(
      catchError(err =>{
        throw err;
      })).subscribe()
  }

  removeToFavorite():void{
    this.unsubscribeRemoveAsana = this.asanaSvc.removeToFavorite(this.asanaId.toString(),this.asana).pipe(
      catchError(err =>{
        throw err;
      })
    ).subscribe()
  }

  isFavorited():boolean{
    return this.asanaSvc.isAsanaFavorite(this.asana)
  }
}
