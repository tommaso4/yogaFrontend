import { Component } from '@angular/core';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { Subscription } from 'rxjs';
import { IAsana } from '../../modules/IAsana';

@Component({
  selector: 'app-sit-pose',
  templateUrl: './sit-pose.component.html',
  styleUrl: './sit-pose.component.scss'
})
export class SitPoseComponent {

  allAsana! : IAsana[] |undefined;
  myAsana! :IAsana[]| undefined;
  unsubscribeAsana!: Subscription;

  constructor(
    private asanaSvc: AsanaSvcService
    ){}


  ngOnInit(): void {
      this.unsubscribeAsana =this.asanaSvc.allAsana$.subscribe(data=>{
        this.allAsana = data
        this.myAsana = this.allAsana?.filter(asana=>asana.typeAsana=== "SITPOSE")})
  }
  ngOnDestroy(): void {
    this.unsubscribeAsana.unsubscribe();
  }

}
