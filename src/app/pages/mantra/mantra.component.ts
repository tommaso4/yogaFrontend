import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsanaSvcService } from '../../services/asana-svc.service';
import { IAsana } from '../../modules/IAsana';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mantra',
  templateUrl: './mantra.component.html',
  styleUrl: './mantra.component.scss'
})
export class MantraComponent {

  // myMantra: IAsana[] | undefined;
  // subMantra!: Subscription;

  // constructor(
  //   private asanaSvc: AsanaSvcService
  // ) { }

  // ngOnInit(): void {
  //   this.asanaSvc.allAsana$.subscribe( mantra => {
  //     this.myMantra = mantra?.filter( data =>{ data.typeAsana = "MANTRA"})
  //   })
  // }

  // ngOnDestroy(): void {
  //   if(this.subMantra)this.subMantra.unsubscribe();
  // }

}
