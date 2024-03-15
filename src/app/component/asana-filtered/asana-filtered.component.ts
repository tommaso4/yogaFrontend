import { Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAsana } from '../../modules/IAsana';
import { Subscription } from 'rxjs';
import { AsanaSvcService } from '../../services/asana-svc.service';

@Component({
  selector: 'app-asana-filtered',
  templateUrl: './asana-filtered.component.html',
  styleUrl: './asana-filtered.component.scss'
})
export class AsanaFilteredComponent implements OnInit , OnDestroy {

  @Input() positionType: string = '';
  myAsana! :IAsana[]| undefined;
  unsubscribeAsana!: Subscription;

  constructor(
    private asanaSvc: AsanaSvcService,
    private router : Router
    ){}

  ngOnInit(): void {
      this.unsubscribeAsana =this.asanaSvc.allAsana$.subscribe(data=>{
        if(this.router.url === '/home'){
          this.myAsana = data
        } else{
          this.myAsana = data?.filter(asana=>asana.typeAsana=== this.positionType)
        }})
  }

  ngOnDestroy(): void {
    if(this.unsubscribeAsana)this.unsubscribeAsana.unsubscribe();
  }
}
